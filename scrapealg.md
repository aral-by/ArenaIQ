# ArenaIQ — Scrape Algorithm (scrapealg.md)

## Genel Mantık

Kullanıcı bir FlashScore maç linki girer. Sistem önce maçın durumunu kontrol eder, zaman kurallarını uygular ve uygunsa canlı veri toplamaya başlar. Temel hedef: her dakikaya ait iki takımın attığı sayıları 5 saniyelik polling ile ayıklayıp 40 hücreli bir tabloya yazmak.

---

## Aşama 1 — Maç Durum Kontrolü

Kullanıcı URL girdikten sonra sistem ilk olarak maçın durumunu sorgular.

**Kontrol edilecek durumlar:**

| Durum | Açıklama | Sistem Tepkisi |
|---|---|---|
| `not_started` | Maç henüz başlamamış | Zaman kontrolüne geç |
| `live` | Maç oynanıyor | Hata: "Maç zaten başladı, analiz başlatılamaz." |
| `finished` | Maç bitti | Hata: "Bu maç zaten tamamlandı." |
| `cancelled` | Maç iptal | Hata: "Bu maç iptal edildi." |

---

## Aşama 2 — Zaman Kuralları (Maç Başlamamışsa)

Maç `not_started` durumundaysa, başlangıç saatine göre şu kurallar uygulanır:

```
Maç başlangıcına kalan süre:

  ≥ 5 dakika   → Sistem kabul eder, maç başlayana kadar bekleme döngüsüne girer
  < 5 dakika   → HATA: "Bu maç çok yaklaştı, analiz başlatılamaz."
  Maç başlamış → HATA: "Maç zaten başladı, analiz başlatılamaz."
  Maç bitmiş   → HATA: "Bu maç zaten tamamlandı."
```

**Bekleme Döngüsü (≥ 5 dakika kaldıysa):**

Sistem maçı kabul ettikten sonra aktif bir bekleme döngüsüne girer. Bu döngüde her 10 saniyede bir FlashScore'dan maçın durumu kontrol edilir. Maç `live` durumuna geçtiği anda bekleme döngüsü sona erer ve scrape başlar.

```
URL kabul edildi → Bekleme döngüsü başladı
      │
      └── Her 10 saniyede: Maç başladı mı?
              ├── Hayır → Bekle
              └── Evet  → Scrape döngüsünü başlat
```

**Neden en az 5 dakika şartı?**
Sistemin tablo yapısını oluşturması, bağlantıyı kurması ve ilk polling turunu hazırlaması için minimum 5 dakika gereklidir. Bu süreden az kalmışsa analiz doğru başlatılamaz.

---

## Aşama 3 — Sayfa Yenileme Döngüsü

Maç başladıktan sonra scraper arka planda her **5 saniyede bir** FlashScore maç sayfasını yeniler ve aşağıdaki veriyi çeker:

```
Örnek ham veri:

  10
  -
  8
  1. Çeyrek 1'
```

Bu veriden parse edilecekler:

- `homeScore` → Ev sahibi toplam skor (örn. 10)
- `awayScore` → Deplasman toplam skor (örn. 8)
- `period` → Periyot (örn. "1. Çeyrek")
- `minute` → Maç dakikası (örn. 1)

---

## Aşama 4 — Dakika Bazlı Sayı Ayıklama Algoritması

Her 5 saniyelik polling turunda sistem şunu yapar:

```
1. Yeni skorları çek → homeScore, awayScore, minute
2. Önceki tur ile karşılaştır:
     - minute değişmediyse → aynı dakika, hücre güncellenmez
     - minute arttıysa     → önceki dakika tamamlandı:
         homeDelta = homeScore(yeni) - homeScore(önceki)
         awayDelta = awayScore(yeni) - awayScore(önceki)
         Tabloda [minute - 1]. satırına yaz:
           home_points[minute-1] = homeDelta
           away_points[minute-1] = awayDelta
3. Mevcut dakika verisini "aktif hücre" olarak işaretle
```

**Örnek akış:**

```
T=0s   → Skor: 6-4, Dakika: 1  → Aktif hücre: dakika 1
T=5s   → Skor: 8-4, Dakika: 1  → Aynı dakika, bekle
T=10s  → Skor: 10-8, Dakika: 1 → Aynı dakika, bekle
T=60s  → Skor: 12-8, Dakika: 2 → Dakika değişti!
          homeDelta = 12 - 6 = 6  →  home[1] = 6
          awayDelta = 8  - 4 = 4  →  away[1] = 4
          Aktif hücre: dakika 2
```

---

## Aşama 5 — 40 Hücreli Tablo Yapısı

Tablo her iki takım için ayrı ayrı tutulur. Sütunlar dakikaları, satırlar takımları temsil eder.

```
Tablo boyutu: 2 satır × 40 sütun

        | D1 | D2 | D3 | D4 | D5 | ... | D40 |
--------|----|----|----|----|-----|-----|-----|
Home    |  6 |  8 |  4 |  9 |  7 | ... |  ?  |
Away    |  4 |  6 |  7 |  3 |  5 | ... |  ?  |
```

**Ek sütunlar (metadata):**

```
        | D1 | D2 | D3 | D4 | ... | D40 | Period
--------|----|----|----|----|-----|-----|--------
Home    |  6 |  8 |  4 |  9 | ... |  ?  |
Away    |  4 |  6 |  7 |  3 | ... |  ?  |
Period  | Q1 | Q1 | Q1 | Q2 | ... |  Q4 |
```

- `D1–D10` → 1. Çeyrek
- `D11–D20` → 2. Çeyrek
- `D21–D30` → 3. Çeyrek
- `D31–D40` → 4. Çeyrek
- Uzatma varsa ek sütunlar dinamik olarak eklenir

---

## Aşama 6 — Hata Senaryoları

| Senaryo | Hata Mesajı |
|---|---|
| Maça 5 dakikadan az kaldı | "Bu maç çok yaklaştı, analiz başlatılamaz." |
| Maç zaten başlamış | "Maç zaten başladı, analiz başlatılamaz." |
| Maç zaten bitti | "Bu maç zaten tamamlandı." |
| Maç iptal edildi | "Bu maç iptal edildi." |
| Scraper bağlanamadı | "FlashScore'a bağlanılamadı. Servisin çalıştığından emin ol." |
| Dakika verisi okunamadı | O polling turu atlanır, bir sonraki turda tekrar denenir |
| Skor geriledi (veri anomalisi) | Anomali loglanır, hücre güncellenmez |

---

## Veri Akışı Özeti

```
URL Girişi
    │
    ▼
Maç Durum Kontrolü
    │
    ├── finished / cancelled → HATA
    ├── not_started + <5dk   → HATA: "Çok yaklaştı"
    ├── not_started + ≥5dk   → Bekleme döngüsü → Maç live olunca devam et
    └── live                 → HATA: "Maç zaten başladı"
              │
              ▼
        Her 5 saniyede:
        Skor + Dakika + Periyot çek
              │
              ▼
        Dakika değişti mi?
        ├── Hayır → Bekle
        └── Evet  → Delta hesapla → Tabloya yaz
              │
              ▼
        Tablo güncellendi → AI modülüne gönder
```

---

## Notlar

- FlashScore bot koruması nedeniyle Playwright stealth modu (`playwright-extra` + `puppeteer-extra-plugin-stealth`) kullanılması önerilir.
- 5 saniyelik polling sunucuya yük bindirmemek için jitter eklenebilir (4.5s – 5.5s arası rastgele).
- Tablo verisi her güncellemeden sonra AI analiz modülüne ham JSON olarak iletilir.
- Bağlantı kopması durumunda scraper otomatik olarak yeniden bağlanmayı 3 kez dener, başarısız olursa kullanıcıya bildirir.