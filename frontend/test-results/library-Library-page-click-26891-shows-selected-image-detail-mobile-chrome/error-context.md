# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: library.spec.ts >> Library page >> clicking a result card shows selected image detail
- Location: e2e\library.spec.ts:146:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('heading', { name: 'Orion Nebula Wide Field', level: 4 }) resolved to 2 elements:
    1) <h4 class="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">Orion Nebula Wide Field</h4> aka getByRole('button', { name: 'Orion Nebula Wide Field 2017-' }).first()
    2) <h4 class="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">Orion Nebula Wide Field</h4> aka getByRole('button', { name: 'Orion Nebula Wide Field 2017-' }).nth(1)

Call log:
  - waiting for getByRole('heading', { name: 'Orion Nebula Wide Field', level: 4 })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - paragraph [ref=e8]: CosmoView
          - heading "Library" [level=1] [ref=e9]
        - button "Switch to dark mode" [ref=e11]:
          - generic [ref=e12]: Light
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
          - paragraph [ref=e52]: Image Library
          - heading "Search NASA's archive and turn image discovery into a guided exploration workflow." [level=2] [ref=e53]
          - paragraph [ref=e54]: This route combines free-form search, archive browsing, result inspection, and a lightweight copilot panel that synthesizes the current search into practical next steps.
        - generic [ref=e56]:
          - generic [ref=e57]:
            - text: Search NASA imagery
            - searchbox "Search NASA imagery" [ref=e58]: nebula
          - button "Search archive" [active] [ref=e59]
        - generic [ref=e60]:
          - generic [ref=e61]:
            - article [ref=e62]:
              - generic [ref=e63]:
                - generic [ref=e64]:
                  - generic [ref=e65]:
                    - img [ref=e66]
                    - paragraph [ref=e69]: Search results
                  - heading "1,247 images for \"nebula\"" [level=3] [ref=e70]
                - generic [ref=e71]: 4 loaded
            - article [ref=e72]:
              - generic [ref=e73]:
                - generic [ref=e74]:
                  - button "Orion Nebula 2017-12-08 Orion Nebula A stunning view of the Orion Nebula captured by the Hubble Space Telescope." [ref=e75]:
                    - img "Orion Nebula" [ref=e76]
                    - generic [ref=e77]:
                      - paragraph [ref=e78]: 2017-12-08
                      - heading "Orion Nebula" [level=4] [ref=e79]
                      - paragraph [ref=e80]: A stunning view of the Orion Nebula captured by the Hubble Space Telescope.
                  - button "Orion Nebula Wide Field 2017-12-08 Orion Nebula Wide Field Wide field view showing the full extent of the Orion Molecular Cloud." [ref=e81]:
                    - img "Orion Nebula Wide Field" [ref=e82]
                    - generic [ref=e83]:
                      - paragraph [ref=e84]: 2017-12-08
                      - heading "Orion Nebula Wide Field" [level=4] [ref=e85]
                      - paragraph [ref=e86]: Wide field view showing the full extent of the Orion Molecular Cloud.
                  - button "Orion Nebula 2017-12-08 Orion Nebula A stunning view of the Orion Nebula captured by the Hubble Space Telescope." [ref=e87]:
                    - img "Orion Nebula" [ref=e88]
                    - generic [ref=e89]:
                      - paragraph [ref=e90]: 2017-12-08
                      - heading "Orion Nebula" [level=4] [ref=e91]
                      - paragraph [ref=e92]: A stunning view of the Orion Nebula captured by the Hubble Space Telescope.
                  - button "Orion Nebula Wide Field 2017-12-08 Orion Nebula Wide Field Wide field view showing the full extent of the Orion Molecular Cloud." [ref=e93]:
                    - img "Orion Nebula Wide Field" [ref=e94]
                    - generic [ref=e95]:
                      - paragraph [ref=e96]: 2017-12-08
                      - heading "Orion Nebula Wide Field" [level=4] [ref=e97]
                      - paragraph [ref=e98]: Wide field view showing the full extent of the Orion Molecular Cloud.
                - button "Load more results" [ref=e100]
          - generic [ref=e101]:
            - article [ref=e102]:
              - img "Orion Nebula" [ref=e103]
              - generic [ref=e104]:
                - generic [ref=e105]:
                  - img [ref=e106]
                  - paragraph [ref=e110]: Selected image
                - heading "Orion Nebula" [level=3] [ref=e111]
                - paragraph [ref=e112]: A stunning view of the Orion Nebula captured by the Hubble Space Telescope.
                - generic [ref=e113]:
                  - generic [ref=e114]:
                    - term [ref=e115]: NASA ID
                    - definition [ref=e116]: GSFC_20171208_Archive_e000699
                  - generic [ref=e117]:
                    - term [ref=e118]: Created
                    - definition [ref=e119]: 2017-12-08T00:00:00Z
            - article [ref=e120]:
              - paragraph [ref=e121]: Explorer Copilot
              - heading "Mission brief for the current search" [level=3] [ref=e122]
              - paragraph [ref=e123]: Searching for "nebula" surfaced 1,247 catalog hits. The current frame, "Orion Nebula", was created on 2017-12-08 and suggests a useful line of inquiry around visual composition, mission context, and scientific subject matter.
              - generic [ref=e124]:
                - paragraph [ref=e125]: Signal read
                - paragraph [ref=e126]: A stunning view of the Orion Nebula captured by the Hubble Space Telescope.
              - generic [ref=e127]:
                - paragraph [ref=e129]: Compare "Orion Nebula" with today's APOD and note what kind of space storytelling each image supports.
                - paragraph [ref=e131]: Use the nebula search results to build a three-image mini exhibition around one scientific theme.
                - paragraph [ref=e133]: Read the description and ask what mission, instrument, or observation context would make this frame more meaningful to a viewer.
              - paragraph [ref=e134]: "Lightweight bonus feature: local prompt synthesis, no external model dependency"
    - contentinfo [ref=e135]:
      - generic [ref=e136]:
        - paragraph [ref=e137]: CosmoView
        - paragraph [ref=e138]:
          - text: Powered by the
          - link "NASA Open APIs" [ref=e139] [cursor=pointer]:
            - /url: https://api.nasa.gov
      - paragraph [ref=e140]: © 2026 CosmoView — built for exploration
  - generic:
    - contentinfo:
      - button "Open TanStack Router Devtools" [ref=e141] [cursor=pointer]:
        - generic [ref=e142]:
          - img [ref=e144]
          - img [ref=e179]
        - generic [ref=e213]: "-"
        - generic [ref=e214]: TanStack Router
  - generic [ref=e215]:
    - img [ref=e217]
    - button "Open Tanstack query devtools" [ref=e265] [cursor=pointer]:
      - img [ref=e266]
```

# Test source

```ts
  60  |   });
  61  | 
  62  |   test('search input and button are present', async ({ page }) => {
  63  |     await page.goto('/library');
  64  | 
  65  |     const searchInput = page.getByRole('searchbox');
  66  |     await expect(searchInput).toBeVisible();
  67  |     await expect(searchInput).toHaveAttribute('placeholder', 'nebula, moon, saturn, hubble...');
  68  | 
  69  |     await expect(page.getByRole('button', { name: 'Search archive' })).toBeVisible();
  70  |   });
  71  | 
  72  |   test('shows archive standby message before a search is entered', async ({ page }) => {
  73  |     await page.goto('/library');
  74  |     await expect(page.getByText('Archive standby')).toBeVisible();
  75  |     await expect(
  76  |       page.getByRole('heading', { level: 3, name: 'Start with a search term to explore NASA imagery.' })
  77  |     ).toBeVisible();
  78  |   });
  79  | 
  80  |   test('typing a query and clicking Search archive returns image cards with titles', async ({
  81  |     page,
  82  |   }) => {
  83  |     await page.route('**/api/v1/images**', (route) =>
  84  |       route.fulfill({
  85  |         status: 200,
  86  |         contentType: 'application/json',
  87  |         body: JSON.stringify(mockSearchResults),
  88  |       })
  89  |     );
  90  | 
  91  |     await page.goto('/library');
  92  | 
  93  |     const searchInput = page.getByRole('searchbox');
  94  |     await searchInput.fill('nebula');
  95  |     await page.getByRole('button', { name: 'Search archive' }).click();
  96  | 
  97  |     // Result count heading
  98  |     await expect(page.getByRole('heading', { level: 3, name: /images for "nebula"/ })).toBeVisible();
  99  | 
  100 |     // Image card titles
  101 |     await expect(page.getByRole('heading', { level: 4, name: 'Orion Nebula' })).toBeVisible();
  102 |     await expect(
  103 |       page.getByRole('heading', { level: 4, name: 'Orion Nebula Wide Field' })
  104 |     ).toBeVisible();
  105 |   });
  106 | 
  107 |   test('debounced search triggers query after typing', async ({ page }) => {
  108 |     await page.route('**/api/v1/images**', (route) =>
  109 |       route.fulfill({
  110 |         status: 200,
  111 |         contentType: 'application/json',
  112 |         body: JSON.stringify(mockSearchResults),
  113 |       })
  114 |     );
  115 | 
  116 |     await page.goto('/library');
  117 | 
  118 |     await page.getByRole('searchbox').fill('nebula');
  119 | 
  120 |     // Wait for debounce (350 ms) to fire
  121 |     await expect(
  122 |       page.getByRole('heading', { level: 3, name: /images for "nebula"/ })
  123 |     ).toBeVisible({ timeout: 5_000 });
  124 |   });
  125 | 
  126 |   test('pressing Enter commits the search immediately', async ({ page }) => {
  127 |     await page.route('**/api/v1/images**', (route) =>
  128 |       route.fulfill({
  129 |         status: 200,
  130 |         contentType: 'application/json',
  131 |         body: JSON.stringify(mockSearchResults),
  132 |       })
  133 |     );
  134 | 
  135 |     await page.goto('/library');
  136 | 
  137 |     const searchInput = page.getByRole('searchbox');
  138 |     await searchInput.fill('nebula');
  139 |     await searchInput.press('Enter');
  140 | 
  141 |     await expect(
  142 |       page.getByRole('heading', { level: 3, name: /images for "nebula"/ })
  143 |     ).toBeVisible();
  144 |   });
  145 | 
  146 |   test('clicking a result card shows selected image detail', async ({ page }) => {
  147 |     await page.route('**/api/v1/images**', (route) =>
  148 |       route.fulfill({
  149 |         status: 200,
  150 |         contentType: 'application/json',
  151 |         body: JSON.stringify(mockSearchResults),
  152 |       })
  153 |     );
  154 | 
  155 |     await page.goto('/library');
  156 |     await page.getByRole('searchbox').fill('nebula');
  157 |     await page.getByRole('button', { name: 'Search archive' }).click();
  158 | 
  159 |     // Click the second card
> 160 |     await page.getByRole('heading', { level: 4, name: 'Orion Nebula Wide Field' }).click();
      |                                                                                    ^ Error: locator.click: Error: strict mode violation: getByRole('heading', { name: 'Orion Nebula Wide Field', level: 4 }) resolved to 2 elements:
  161 | 
  162 |     // The detail panel on the right should show the selected image title
  163 |     await expect(
  164 |       page.getByRole('heading', { level: 3, name: 'Orion Nebula Wide Field' })
  165 |     ).toBeVisible();
  166 |   });
  167 | 
  168 |   test('shows no-results state for an unmatched query', async ({ page }) => {
  169 |     await page.route('**/api/v1/images**', (route) =>
  170 |       route.fulfill({
  171 |         status: 200,
  172 |         contentType: 'application/json',
  173 |         body: JSON.stringify(mockNoResults),
  174 |       })
  175 |     );
  176 | 
  177 |     await page.goto('/library');
  178 | 
  179 |     const searchInput = page.getByRole('searchbox');
  180 |     await searchInput.fill('xyzzy12345');
  181 |     await page.getByRole('button', { name: 'Search archive' }).click();
  182 | 
  183 |     await expect(page.getByText('No matching images')).toBeVisible();
  184 |     await expect(
  185 |       page.getByRole('heading', { level: 3, name: /The archive did not return results for "xyzzy12345"/ })
  186 |     ).toBeVisible();
  187 |   });
  188 | 
  189 |   test('queries shorter than 2 characters do not trigger a search', async ({ page }) => {
  190 |     await page.goto('/library');
  191 | 
  192 |     // Type a single character — standby state should persist
  193 |     await page.getByRole('searchbox').fill('n');
  194 |     await page.getByRole('button', { name: 'Search archive' }).click();
  195 | 
  196 |     await expect(page.getByText('Archive standby')).toBeVisible();
  197 |   });
  198 | });
  199 | 
```