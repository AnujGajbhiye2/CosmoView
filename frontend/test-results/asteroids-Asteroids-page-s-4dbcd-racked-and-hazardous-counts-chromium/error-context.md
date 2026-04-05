# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: asteroids.spec.ts >> Asteroids page >> summary metric cards render tracked and hazardous counts
- Location: e2e\asteroids.spec.ts:154:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Hazardous objects')
Expected: visible
Error: strict mode violation: getByText('Hazardous objects') resolved to 3 elements:
    1) <p class="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-text-faint)]">Hazardous objects</p> aka getByText('Hazardous objects', { exact: true })
    2) <p class="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-faint)]">Longer bars mean the object is moving faster rela…</p> aka getByText('Longer bars mean the object')
    3) <p class="mt-3 text-sm leading-6 text-[var(--color-text-faint)]">Points farther left are closer to Earth, points h…</p> aka getByText('Points farther left are')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Hazardous objects')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e4]:
      - banner [ref=e5]:
        - generic [ref=e7]:
          - paragraph [ref=e8]: CosmoView
          - heading "Asteroids" [level=1] [ref=e9]
        - generic [ref=e10]:
          - button "Switch to dark mode" [ref=e12]:
            - generic [ref=e13]: Light
          - navigation [ref=e16]:
            - link "Mission Control" [ref=e17] [cursor=pointer]:
              - /url: /
              - img [ref=e18]
              - text: Mission Control
            - link "APOD" [ref=e23] [cursor=pointer]:
              - /url: /apod
              - img [ref=e24]
              - text: APOD
            - link "Asteroids" [ref=e32] [cursor=pointer]:
              - /url: /asteroids
              - img [ref=e33]
              - text: Asteroids
            - link "Earth" [ref=e39] [cursor=pointer]:
              - /url: /earth
              - img [ref=e40]
              - text: Earth
            - link "Library" [ref=e43] [cursor=pointer]:
              - /url: /library
              - img [ref=e44]
              - text: Library
            - link "Lab" [ref=e46] [cursor=pointer]:
              - /url: /lab
              - img [ref=e47]
              - text: Lab
      - main [ref=e49]:
        - generic [ref=e50]:
          - generic [ref=e51]:
            - paragraph [ref=e52]: Asteroid Analytics
            - heading "Inspect velocity, scale, and risk across the current near-Earth object watch window." [level=2] [ref=e53]
            - paragraph [ref=e54]: The backend constrains the date range to NASA's seven-day feed limit. This view turns that feed into a readable analytics surface with summary metrics, comparative bars, and an inspection table.
          - generic [ref=e55]:
            - paragraph [ref=e56]: Date range
            - generic [ref=e57]:
              - generic [ref=e59]:
                - paragraph [ref=e60]: Start date
                - 'button "Start date: 2026-04-03" [ref=e63] [cursor=pointer]':
                  - generic [ref=e64]: 03-04-2026
                  - img [ref=e65]
              - generic [ref=e68]: to
              - generic [ref=e70]:
                - paragraph [ref=e71]: End date
                - 'button "End date: 2026-04-05" [ref=e74] [cursor=pointer]':
                  - generic [ref=e75]: 05-04-2026
                  - img [ref=e76]
            - paragraph [ref=e78]: Range is clamped to NASA's 7-day feed limit.
          - generic [ref=e79]:
            - generic [ref=e80]:
              - article [ref=e81]:
                - generic [ref=e82]:
                  - paragraph [ref=e83]: Tracked objects
                  - button "The number of near-Earth objects NASA returned for the selected date range." [ref=e84]:
                    - img [ref=e85]
                - paragraph [ref=e88]: "3"
                - paragraph [ref=e89]: Total near-Earth objects reported by NASA for this date window.
              - article [ref=e90]:
                - generic [ref=e91]:
                  - paragraph [ref=e92]: Hazardous objects
                  - button "NASA's potentially hazardous flag is a classification based on orbit and size. It does not mean an impact is predicted." [ref=e93]:
                    - img [ref=e94]
                - paragraph [ref=e97]: "1"
                - paragraph [ref=e98]: NASA has tagged these objects as potentially hazardous, not as impact predictions.
              - article [ref=e99]:
                - generic [ref=e100]:
                  - paragraph [ref=e101]: Fastest object
                  - button "The object moving fastest relative to Earth at its closest approach in the selected date range." [ref=e102]:
                    - img [ref=e103]
                - paragraph [ref=e106]: (2021 RG5)
                - paragraph [ref=e107]: 72,000 km/h
                - paragraph [ref=e108]: This is the highest reported approach speed relative to Earth in this window.
              - article [ref=e109]:
                - generic [ref=e110]:
                  - paragraph [ref=e111]: Closest pass
                  - button "The object with the smallest reported miss distance in the selected date range." [ref=e112]:
                    - img [ref=e113]
                - paragraph [ref=e116]: (2021 RG5)
                - paragraph [ref=e117]: 1,200,000 km
                - paragraph [ref=e118]: This is the closest reported flyby distance to Earth in this range.
            - generic [ref=e119]:
              - article [ref=e120]:
                - generic [ref=e121]:
                  - generic [ref=e122]:
                    - generic [ref=e123]:
                      - img [ref=e124]
                      - paragraph [ref=e130]: Velocity profile
                    - heading "Relative speed across the watch window" [level=3] [ref=e131]
                    - paragraph [ref=e132]: Longer bars mean the object is moving faster relative to Earth, and red bars mark NASA-flagged hazardous objects.
                  - paragraph [ref=e133]: Compare how fast each object is moving at close approach.
                - application [ref=e137]:
                  - generic [ref=e152]:
                    - generic [ref=e154]: 2010 XK1
                    - generic [ref=e156]: 2021 RG5
                    - generic [ref=e158]: 2023 AZ
              - article [ref=e159]:
                - generic [ref=e160]:
                  - img [ref=e161]
                  - paragraph [ref=e167]: Risk matrix
                - heading "Size vs. miss distance" [level=3] [ref=e168]
                - paragraph [ref=e169]: Points farther left are closer to Earth, points higher up are larger, and red points are NASA-flagged hazardous objects.
                - generic [ref=e172]:
                  - list [ref=e174]:
                    - listitem [ref=e175]:
                      - img "Hazardous legend icon" [ref=e176]
                      - generic [ref=e178]: Hazardous
                    - listitem [ref=e179]:
                      - img "Safe legend icon" [ref=e180]
                      - generic [ref=e182]: Safe
                  - application [ref=e183]:
                    - generic [ref=e201]:
                      - generic [ref=e202]:
                        - generic [ref=e204]: "0"
                        - generic [ref=e206]: "2000"
                        - generic [ref=e208]: "4000"
                        - generic [ref=e210]: "6000"
                        - generic [ref=e212]: "8000"
                      - generic [ref=e213]: Miss dist (x1,000 km)
                      - generic [ref=e214]:
                        - generic [ref=e216]: "0"
                        - generic [ref=e218]: "0.15"
                        - generic [ref=e220]: "0.3"
                        - generic [ref=e222]: "0.45"
                        - generic [ref=e224]: "0.6"
                      - generic [ref=e225]: Diameter (km)
            - article [ref=e226]:
              - generic [ref=e227]:
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - img [ref=e230]
                    - paragraph [ref=e236]: Inspection table
                  - heading "Raw close-approach view" [level=3] [ref=e237]
                  - paragraph [ref=e238]: This is the per-object list for the selected date range. Click any sortable column to reorder it, and use the 10-row pages to scan the results more easily.
                - generic [ref=e239]:
                  - generic [ref=e240]: 2026-04-03 to 2026-04-05
                  - generic [ref=e241]: Page 1 of 1
              - table [ref=e243]:
                - rowgroup [ref=e244]:
                  - row "Object The asteroid name or catalog label NASA uses for that object. Date The reported date of the asteroid's close approach to Earth. Velocity Speed of the asteroid relative to Earth at its closest approach point, in kilometres per hour. Miss distance How close the asteroid's orbit passes to Earth's centre. Smaller = closer. The Moon is ~384,000 km away for reference. Diameter max Upper bound of the estimated physical size of the asteroid. NASA uses reflectance modelling to derive this range." [ref=e245]:
                    - columnheader "Object The asteroid name or catalog label NASA uses for that object." [ref=e246]:
                      - generic [ref=e247]:
                        - button "Object" [ref=e248] [cursor=pointer]:
                          - text: Object
                          - img [ref=e250]
                        - button "The asteroid name or catalog label NASA uses for that object." [ref=e253]:
                          - img [ref=e254]
                    - columnheader "Date The reported date of the asteroid's close approach to Earth." [ref=e257]:
                      - generic [ref=e258]:
                        - button "Date" [ref=e259] [cursor=pointer]:
                          - text: Date
                          - img [ref=e261]
                        - button "The reported date of the asteroid's close approach to Earth." [ref=e263]:
                          - img [ref=e264]
                    - columnheader "Velocity Speed of the asteroid relative to Earth at its closest approach point, in kilometres per hour." [ref=e267]:
                      - generic [ref=e268]:
                        - button "Velocity" [ref=e269] [cursor=pointer]:
                          - text: Velocity
                          - img [ref=e271]
                        - button "Speed of the asteroid relative to Earth at its closest approach point, in kilometres per hour." [ref=e274]:
                          - img [ref=e275]
                    - columnheader "Miss distance How close the asteroid's orbit passes to Earth's centre. Smaller = closer. The Moon is ~384,000 km away for reference." [ref=e278]:
                      - generic [ref=e279]:
                        - button "Miss distance" [ref=e280] [cursor=pointer]:
                          - text: Miss distance
                          - img [ref=e282]
                        - button "How close the asteroid's orbit passes to Earth's centre. Smaller = closer. The Moon is ~384,000 km away for reference." [ref=e285]:
                          - img [ref=e286]
                    - columnheader "Diameter max Upper bound of the estimated physical size of the asteroid. NASA uses reflectance modelling to derive this range." [ref=e289]:
                      - generic [ref=e290]:
                        - button "Diameter max" [ref=e291] [cursor=pointer]:
                          - text: Diameter max
                          - img [ref=e293]
                        - button "Upper bound of the estimated physical size of the asteroid. NASA uses reflectance modelling to derive this range." [ref=e296]:
                          - img [ref=e297]
                - rowgroup [ref=e300]:
                  - row "(2010 XK1) 2026-04-03 48,000 km/h 4,800,000 km 0.21 km" [ref=e301]:
                    - cell "(2010 XK1)" [ref=e302]
                    - cell "2026-04-03" [ref=e303]
                    - cell "48,000 km/h" [ref=e304]
                    - cell "4,800,000 km" [ref=e305]
                    - cell "0.21 km" [ref=e306]
                  - row "(2021 RG5) 2026-04-04 72,000 km/h 1,200,000 km 0.41 km" [ref=e307]:
                    - cell "(2021 RG5)" [ref=e308]
                    - cell "2026-04-04" [ref=e309]
                    - cell "72,000 km/h" [ref=e310]
                    - cell "1,200,000 km" [ref=e311]
                    - cell "0.41 km" [ref=e312]
                  - row "(2023 AZ) 2026-04-05 35,000 km/h 7,500,000 km 0.11 km" [ref=e313]:
                    - cell "(2023 AZ)" [ref=e314]
                    - cell "2026-04-05" [ref=e315]
                    - cell "35,000 km/h" [ref=e316]
                    - cell "7,500,000 km" [ref=e317]
                    - cell "0.11 km" [ref=e318]
              - generic [ref=e319]:
                - paragraph [ref=e320]: Showing 1-3 of 3 objects
                - generic [ref=e321]:
                  - button "Previous" [disabled] [ref=e322]
                  - button "Next" [disabled] [ref=e323]
              - paragraph [ref=e324]: "Largest object in range: (2021 RG5) at 0.41 km maximum estimated diameter."
      - contentinfo [ref=e325]:
        - generic [ref=e326]:
          - paragraph [ref=e327]: CosmoView
          - paragraph [ref=e328]:
            - text: Powered by the
            - link "NASA Open APIs" [ref=e329] [cursor=pointer]:
              - /url: https://api.nasa.gov
        - paragraph [ref=e330]: © 2026 CosmoView — built for exploration
    - generic:
      - contentinfo:
        - button "Open TanStack Router Devtools" [ref=e331] [cursor=pointer]:
          - generic [ref=e332]:
            - img [ref=e334]
            - img [ref=e369]
          - generic [ref=e403]: "-"
          - generic [ref=e404]: TanStack Router
    - generic [ref=e405]:
      - img [ref=e407]
      - button "Open Tanstack query devtools" [ref=e455] [cursor=pointer]:
        - img [ref=e456]
  - generic [ref=e504]: "0.15"
```

# Test source

```ts
  66  | 
  67  |   test('informs user of the 7-day range constraint', async ({ page }) => {
  68  |     await page.goto('/asteroids');
  69  |     await expect(
  70  |       page.getByText("Range is clamped to NASA's 7-day feed limit.")
  71  |     ).toBeVisible();
  72  |   });
  73  | 
  74  |   test('date range is automatically clamped to 7 days', async ({ page }) => {
  75  |     await page.goto('/asteroids');
  76  | 
  77  |     // The end date button displays in DD-MM-YYYY format
  78  |     const startBtn = page.getByRole('button', { name: /Start date:/ });
  79  |     const endBtn = page.getByRole('button', { name: /End date:/ });
  80  | 
  81  |     const startAriaLabel = await startBtn.getAttribute('aria-label');
  82  |     const endAriaLabel = await endBtn.getAttribute('aria-label');
  83  | 
  84  |     // Extract ISO dates from "Start date: YYYY-MM-DD"
  85  |     const startIso = startAriaLabel?.replace('Start date: ', '') ?? '';
  86  |     const endIso = endAriaLabel?.replace('End date: ', '') ?? '';
  87  | 
  88  |     const startMs = new Date(`${startIso}T00:00:00Z`).getTime();
  89  |     const endMs = new Date(`${endIso}T00:00:00Z`).getTime();
  90  |     const diffDays = Math.floor((endMs - startMs) / 86_400_000);
  91  | 
  92  |     expect(diffDays).toBeLessThanOrEqual(6);
  93  |   });
  94  | 
  95  |   test('velocity bar chart renders after data loads', async ({ page }) => {
  96  |     await page.route('**/api/v1/asteroids**', (route) =>
  97  |       route.fulfill({
  98  |         status: 200,
  99  |         contentType: 'application/json',
  100 |         body: JSON.stringify(mockAsteroidFeed),
  101 |       })
  102 |     );
  103 | 
  104 |     await page.goto('/asteroids');
  105 | 
  106 |     // Chart section heading
  107 |     await expect(page.getByText('Velocity profile')).toBeVisible();
  108 |     await expect(
  109 |       page.getByRole('heading', { level: 3, name: 'Relative speed across the watch window' })
  110 |     ).toBeVisible();
  111 | 
  112 |     // Recharts renders an SVG
  113 |     await expect(page.locator('.recharts-wrapper').first()).toBeVisible();
  114 |   });
  115 | 
  116 |   test('risk matrix scatter chart renders', async ({ page }) => {
  117 |     await page.route('**/api/v1/asteroids**', (route) =>
  118 |       route.fulfill({
  119 |         status: 200,
  120 |         contentType: 'application/json',
  121 |         body: JSON.stringify(mockAsteroidFeed),
  122 |       })
  123 |     );
  124 | 
  125 |     await page.goto('/asteroids');
  126 | 
  127 |     await expect(page.getByText('Risk matrix')).toBeVisible();
  128 |     await expect(
  129 |       page.getByRole('heading', { level: 3, name: 'Size vs. miss distance' })
  130 |     ).toBeVisible();
  131 | 
  132 |     await expect(page.locator('.recharts-wrapper').nth(1)).toBeVisible();
  133 |   });
  134 | 
  135 |   test('inspection table renders asteroid rows', async ({ page }) => {
  136 |     await page.route('**/api/v1/asteroids**', (route) =>
  137 |       route.fulfill({
  138 |         status: 200,
  139 |         contentType: 'application/json',
  140 |         body: JSON.stringify(mockAsteroidFeed),
  141 |       })
  142 |     );
  143 | 
  144 |     await page.goto('/asteroids');
  145 | 
  146 |     await expect(page.getByText('Inspection table')).toBeVisible();
  147 | 
  148 |     // Table rows — asteroid names
  149 |     await expect(page.getByRole('cell', { name: '(2010 XK1)' })).toBeVisible();
  150 |     await expect(page.getByRole('cell', { name: '(2021 RG5)' })).toBeVisible();
  151 |     await expect(page.getByRole('cell', { name: '(2023 AZ)' })).toBeVisible();
  152 |   });
  153 | 
  154 |   test('summary metric cards render tracked and hazardous counts', async ({ page }) => {
  155 |     await page.route('**/api/v1/asteroids**', (route) =>
  156 |       route.fulfill({
  157 |         status: 200,
  158 |         contentType: 'application/json',
  159 |         body: JSON.stringify(mockAsteroidFeed),
  160 |       })
  161 |     );
  162 | 
  163 |     await page.goto('/asteroids');
  164 | 
  165 |     await expect(page.getByText('Tracked objects')).toBeVisible();
> 166 |     await expect(page.getByText('Hazardous objects')).toBeVisible();
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  167 | 
  168 |     // Total count from mock
  169 |     await expect(page.getByText('3')).toBeVisible();
  170 |     // Hazardous count (1 in mock)
  171 |     await expect(page.getByText('1')).toBeVisible();
  172 |   });
  173 | });
  174 | 
```