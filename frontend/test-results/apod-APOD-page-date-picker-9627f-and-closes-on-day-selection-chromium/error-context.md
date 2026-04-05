# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: apod.spec.ts >> APOD page >> date picker calendar opens on button click and closes on day selection
- Location: e2e\apod.spec.ts:116:3

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.click: Test timeout of 40000ms exceeded.
Call log:
  - waiting for getByRole('dialog', { name: /Select APOD date calendar/ }).locator('button[class*="day_button"]:not([disabled])').first()

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e7]:
        - paragraph [ref=e8]: CosmoView
        - heading "APOD" [level=1] [ref=e9]
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
          - paragraph [ref=e52]: APOD Explorer
          - heading "Navigate NASA's daily astronomy storytelling frame by frame." [level=2] [ref=e53]
          - paragraph [ref=e54]: Move through the archive, inspect the metadata, and treat each day as a self-contained mission brief for the cosmos.
        - generic [ref=e55]:
          - paragraph [ref=e56]: Select APOD date
          - generic [ref=e57]:
            - button "Previous" [ref=e58] [cursor=pointer]
            - generic [ref=e59]:
              - 'button "Select APOD date: 2026-04-05" [expanded] [active] [ref=e60] [cursor=pointer]':
                - generic [ref=e61]: 05-04-2026
                - img [ref=e62]
              - dialog "Select APOD date calendar" [ref=e64]:
                - generic [ref=e67]:
                  - status [ref=e69]: April 2026
                  - navigation "Navigation bar" [ref=e70]:
                    - button "Go to the Previous Month" [ref=e71] [cursor=pointer]:
                      - img [ref=e72]
                    - button "Go to the Next Month" [ref=e74] [cursor=pointer]:
                      - img [ref=e75]
                  - grid "April 2026" [ref=e77]:
                    - rowgroup [ref=e78]:
                      - row [ref=e79]:
                        - columnheader [ref=e80]: Su
                        - columnheader [ref=e81]: Mo
                        - columnheader [ref=e82]: Tu
                        - columnheader [ref=e83]: We
                        - columnheader [ref=e84]: Th
                        - columnheader [ref=e85]: Fr
                        - columnheader [ref=e86]: Sa
                    - rowgroup [ref=e87]:
                      - row "Wednesday, April 1st, 2026 Thursday, April 2nd, 2026 Friday, April 3rd, 2026 Saturday, April 4th, 2026" [ref=e88]:
                        - gridcell "Wednesday, April 1st, 2026" [ref=e89]:
                          - button "Wednesday, April 1st, 2026" [ref=e90] [cursor=pointer]: "1"
                        - gridcell "Thursday, April 2nd, 2026" [ref=e91]:
                          - button "Thursday, April 2nd, 2026" [ref=e92] [cursor=pointer]: "2"
                        - gridcell "Friday, April 3rd, 2026" [ref=e93]:
                          - button "Friday, April 3rd, 2026" [ref=e94] [cursor=pointer]: "3"
                        - gridcell "Saturday, April 4th, 2026" [ref=e95]:
                          - button "Saturday, April 4th, 2026" [ref=e96] [cursor=pointer]: "4"
                      - row "Today, Sunday, April 5th, 2026, selected Monday, April 6th, 2026 Tuesday, April 7th, 2026 Wednesday, April 8th, 2026 Thursday, April 9th, 2026 Friday, April 10th, 2026 Saturday, April 11th, 2026" [ref=e97]:
                        - gridcell "Today, Sunday, April 5th, 2026, selected" [selected] [ref=e98]:
                          - button "Today, Sunday, April 5th, 2026, selected" [ref=e99] [cursor=pointer]: "5"
                        - gridcell "Monday, April 6th, 2026" [ref=e100]:
                          - button "Monday, April 6th, 2026" [disabled] [ref=e101] [cursor=pointer]: "6"
                        - gridcell "Tuesday, April 7th, 2026" [ref=e102]:
                          - button "Tuesday, April 7th, 2026" [disabled] [ref=e103] [cursor=pointer]: "7"
                        - gridcell "Wednesday, April 8th, 2026" [ref=e104]:
                          - button "Wednesday, April 8th, 2026" [disabled] [ref=e105] [cursor=pointer]: "8"
                        - gridcell "Thursday, April 9th, 2026" [ref=e106]:
                          - button "Thursday, April 9th, 2026" [disabled] [ref=e107] [cursor=pointer]: "9"
                        - gridcell "Friday, April 10th, 2026" [ref=e108]:
                          - button "Friday, April 10th, 2026" [disabled] [ref=e109] [cursor=pointer]: "10"
                        - gridcell "Saturday, April 11th, 2026" [ref=e110]:
                          - button "Saturday, April 11th, 2026" [disabled] [ref=e111] [cursor=pointer]: "11"
                      - row "Sunday, April 12th, 2026 Monday, April 13th, 2026 Tuesday, April 14th, 2026 Wednesday, April 15th, 2026 Thursday, April 16th, 2026 Friday, April 17th, 2026 Saturday, April 18th, 2026" [ref=e112]:
                        - gridcell "Sunday, April 12th, 2026" [ref=e113]:
                          - button "Sunday, April 12th, 2026" [disabled] [ref=e114] [cursor=pointer]: "12"
                        - gridcell "Monday, April 13th, 2026" [ref=e115]:
                          - button "Monday, April 13th, 2026" [disabled] [ref=e116] [cursor=pointer]: "13"
                        - gridcell "Tuesday, April 14th, 2026" [ref=e117]:
                          - button "Tuesday, April 14th, 2026" [disabled] [ref=e118] [cursor=pointer]: "14"
                        - gridcell "Wednesday, April 15th, 2026" [ref=e119]:
                          - button "Wednesday, April 15th, 2026" [disabled] [ref=e120] [cursor=pointer]: "15"
                        - gridcell "Thursday, April 16th, 2026" [ref=e121]:
                          - button "Thursday, April 16th, 2026" [disabled] [ref=e122] [cursor=pointer]: "16"
                        - gridcell "Friday, April 17th, 2026" [ref=e123]:
                          - button "Friday, April 17th, 2026" [disabled] [ref=e124] [cursor=pointer]: "17"
                        - gridcell "Saturday, April 18th, 2026" [ref=e125]:
                          - button "Saturday, April 18th, 2026" [disabled] [ref=e126] [cursor=pointer]: "18"
                      - row "Sunday, April 19th, 2026 Monday, April 20th, 2026 Tuesday, April 21st, 2026 Wednesday, April 22nd, 2026 Thursday, April 23rd, 2026 Friday, April 24th, 2026 Saturday, April 25th, 2026" [ref=e127]:
                        - gridcell "Sunday, April 19th, 2026" [ref=e128]:
                          - button "Sunday, April 19th, 2026" [disabled] [ref=e129] [cursor=pointer]: "19"
                        - gridcell "Monday, April 20th, 2026" [ref=e130]:
                          - button "Monday, April 20th, 2026" [disabled] [ref=e131] [cursor=pointer]: "20"
                        - gridcell "Tuesday, April 21st, 2026" [ref=e132]:
                          - button "Tuesday, April 21st, 2026" [disabled] [ref=e133] [cursor=pointer]: "21"
                        - gridcell "Wednesday, April 22nd, 2026" [ref=e134]:
                          - button "Wednesday, April 22nd, 2026" [disabled] [ref=e135] [cursor=pointer]: "22"
                        - gridcell "Thursday, April 23rd, 2026" [ref=e136]:
                          - button "Thursday, April 23rd, 2026" [disabled] [ref=e137] [cursor=pointer]: "23"
                        - gridcell "Friday, April 24th, 2026" [ref=e138]:
                          - button "Friday, April 24th, 2026" [disabled] [ref=e139] [cursor=pointer]: "24"
                        - gridcell "Saturday, April 25th, 2026" [ref=e140]:
                          - button "Saturday, April 25th, 2026" [disabled] [ref=e141] [cursor=pointer]: "25"
                      - row "Sunday, April 26th, 2026 Monday, April 27th, 2026 Tuesday, April 28th, 2026 Wednesday, April 29th, 2026 Thursday, April 30th, 2026" [ref=e142]:
                        - gridcell "Sunday, April 26th, 2026" [ref=e143]:
                          - button "Sunday, April 26th, 2026" [disabled] [ref=e144] [cursor=pointer]: "26"
                        - gridcell "Monday, April 27th, 2026" [ref=e145]:
                          - button "Monday, April 27th, 2026" [disabled] [ref=e146] [cursor=pointer]: "27"
                        - gridcell "Tuesday, April 28th, 2026" [ref=e147]:
                          - button "Tuesday, April 28th, 2026" [disabled] [ref=e148] [cursor=pointer]: "28"
                        - gridcell "Wednesday, April 29th, 2026" [ref=e149]:
                          - button "Wednesday, April 29th, 2026" [disabled] [ref=e150] [cursor=pointer]: "29"
                        - gridcell "Thursday, April 30th, 2026" [ref=e151]:
                          - button "Thursday, April 30th, 2026" [disabled] [ref=e152] [cursor=pointer]: "30"
            - button "Next" [ref=e153] [cursor=pointer]
        - generic [ref=e154]:
          - img "Orion Nebula Deep Field" [ref=e156]
          - article [ref=e157]:
            - generic [ref=e158]:
              - img [ref=e159]
              - paragraph [ref=e167]: Astronomy Picture of the Day
            - heading "Orion Nebula Deep Field" [level=2] [ref=e168]
            - paragraph [ref=e169]: 2024-01-15
            - paragraph [ref=e170]: The Orion Nebula is one of the most scrutinised and photographed objects in the night sky. It is among the closest stellar nurseries to Earth.
            - button "Read more" [ref=e171]
            - generic [ref=e172]:
              - generic [ref=e173]:
                - term [ref=e174]: Media type
                - definition [ref=e175]: image
              - generic [ref=e176]:
                - term [ref=e177]: Copyright
                - definition [ref=e178]: NASA / Public domain
    - contentinfo [ref=e179]:
      - generic [ref=e180]:
        - paragraph [ref=e181]: CosmoView
        - paragraph [ref=e182]:
          - text: Powered by the
          - link "NASA Open APIs" [ref=e183] [cursor=pointer]:
            - /url: https://api.nasa.gov
      - paragraph [ref=e184]: © 2026 CosmoView — built for exploration
  - generic:
    - contentinfo:
      - button "Open TanStack Router Devtools" [ref=e185] [cursor=pointer]:
        - generic [ref=e186]:
          - img [ref=e188]
          - img [ref=e223]
        - generic [ref=e257]: "-"
        - generic [ref=e258]: TanStack Router
  - generic [ref=e259]:
    - img [ref=e261]
    - button "Open Tanstack query devtools" [ref=e309] [cursor=pointer]:
      - img [ref=e310]
```

# Test source

```ts
  43  |   });
  44  | 
  45  |   test('date navigation control is present', async ({ page }) => {
  46  |     await page.goto('/apod');
  47  |     await expect(page.getByText('Select APOD date')).toBeVisible();
  48  |     await expect(page.getByRole('button', { name: /Select APOD date:/ })).toBeVisible();
  49  |     await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  50  |     await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  51  |   });
  52  | 
  53  |   test('shows APOD image and metadata after data loads', async ({ page }) => {
  54  |     await page.route('**/api/v1/apod**', (route) =>
  55  |       route.fulfill({
  56  |         status: 200,
  57  |         contentType: 'application/json',
  58  |         body: JSON.stringify(mockApodResponse),
  59  |       })
  60  |     );
  61  | 
  62  |     await page.goto('/apod');
  63  | 
  64  |     // Wait for content to render
  65  |     await expect(
  66  |       page.getByRole('heading', { level: 2, name: 'Orion Nebula Deep Field' })
  67  |     ).toBeVisible();
  68  | 
  69  |     // Image should be present
  70  |     await expect(page.getByRole('img', { name: 'Orion Nebula Deep Field' })).toBeVisible();
  71  | 
  72  |     // Explanation text should be visible
  73  |     await expect(page.getByText(/stellar nurseries to Earth/)).toBeVisible();
  74  | 
  75  |     // Metadata fields
  76  |     await expect(page.getByText('2024-01-15')).toBeVisible();
  77  |     await expect(page.getByText('image')).toBeVisible();
  78  |     await expect(page.getByText('NASA / Public domain')).toBeVisible();
  79  |   });
  80  | 
  81  |   test('Previous button shifts date back and triggers content reload', async ({ page }) => {
  82  |     let callCount = 0;
  83  | 
  84  |     await page.route('**/api/v1/apod**', (route) => {
  85  |       callCount++;
  86  |       const response = callCount === 1 ? mockApodResponse : mockApodResponseAlt;
  87  |       return route.fulfill({
  88  |         status: 200,
  89  |         contentType: 'application/json',
  90  |         body: JSON.stringify(response),
  91  |       });
  92  |     });
  93  | 
  94  |     await page.goto('/apod');
  95  | 
  96  |     // Wait for initial content
  97  |     await expect(
  98  |       page.getByRole('heading', { level: 2, name: 'Orion Nebula Deep Field' })
  99  |     ).toBeVisible();
  100 | 
  101 |     const dateButton = page.getByRole('button', { name: /Select APOD date:/ });
  102 |     const dateBefore = await dateButton.textContent();
  103 | 
  104 |     // Click Previous
  105 |     await page.getByRole('button', { name: 'Previous' }).click();
  106 | 
  107 |     // Date display should change
  108 |     await expect(dateButton).not.toHaveText(dateBefore ?? '');
  109 | 
  110 |     // New content should load
  111 |     await expect(
  112 |       page.getByRole('heading', { level: 2, name: 'Milky Way Rising' })
  113 |     ).toBeVisible();
  114 |   });
  115 | 
  116 |   test('date picker calendar opens on button click and closes on day selection', async ({
  117 |     page,
  118 |   }) => {
  119 |     await page.route('**/api/v1/apod**', (route) =>
  120 |       route.fulfill({
  121 |         status: 200,
  122 |         contentType: 'application/json',
  123 |         body: JSON.stringify(mockApodResponse),
  124 |       })
  125 |     );
  126 | 
  127 |     await page.goto('/apod');
  128 | 
  129 |     const dateButton = page.getByRole('button', { name: /Select APOD date:/ });
  130 | 
  131 |     // Calendar should be closed initially
  132 |     const calendarDialog = page.getByRole('dialog', { name: /Select APOD date calendar/ });
  133 |     await expect(calendarDialog).not.toBeVisible();
  134 | 
  135 |     // Open calendar
  136 |     await dateButton.click();
  137 |     await expect(calendarDialog).toBeVisible();
  138 | 
  139 |     // Click the first enabled day button inside the calendar
  140 |     const enabledDay = calendarDialog
  141 |       .locator('button[class*="day_button"]:not([disabled])')
  142 |       .first();
> 143 |     await enabledDay.click();
      |                      ^ Error: locator.click: Test timeout of 40000ms exceeded.
  144 | 
  145 |     // Calendar should close after selection
  146 |     await expect(calendarDialog).not.toBeVisible();
  147 |   });
  148 | 
  149 |   test('Read more / Show less toggle expands explanation text', async ({ page }) => {
  150 |     await page.route('**/api/v1/apod**', (route) =>
  151 |       route.fulfill({
  152 |         status: 200,
  153 |         contentType: 'application/json',
  154 |         body: JSON.stringify(mockApodResponse),
  155 |       })
  156 |     );
  157 | 
  158 |     await page.goto('/apod');
  159 |     await expect(page.getByRole('heading', { level: 2, name: 'Orion Nebula Deep Field' })).toBeVisible();
  160 | 
  161 |     const readMoreBtn = page.getByRole('button', { name: 'Read more' });
  162 |     await expect(readMoreBtn).toBeVisible();
  163 |     await readMoreBtn.click();
  164 | 
  165 |     await expect(page.getByRole('button', { name: 'Show less' })).toBeVisible();
  166 |   });
  167 | });
  168 | 
```