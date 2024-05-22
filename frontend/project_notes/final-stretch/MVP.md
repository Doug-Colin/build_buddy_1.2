Running Tally of Things I still need to do (not in priority):

Overall UI:

- Introduce loading animations!

Responsive Data Table View / DataTable UI:

- checkbox prepending first header column (currently 'Task') is not vertically centered in cell
- upper left and lower left corners of data table border are missing or transparent- in fact, it seems that the issue is the pinned column, which is darker, and does not have a rounded corner at top left of header cell and bottom left of footer cell.

See here for header:

```tsx
  <TableHead
    key={header.id}
    colSpan={header.colSpan}
    style={{ ...getCommonPinningStyles(column) }}
  >
```

- fix datatable UI; currently on smallest mobile screens, when first column becomes pinnable and darker, as you horizontally scroll the unpinned columns, the pin column shakes/shifts slighty., and the scrolled columns become visible behind the pinned left column.
  See following comment, possibly relevant, in components/ui/table:

```js
 //pr-0 necessary for pinned columns to maintain stable position relative to each other.
```

- currently on smallest mobile screens, when first column becomes pinnable and darker, as you horizontally scroll the unpinned columns, the pinned column is translucent in places and you see the horizontally scrolled columns to it's reight become visible beneath is as you scroll.
- (unnecessary) Make it so that last columns gradually 'pop away' to smaller screens so that horiz. scroll is unnecessary
- (better) Make it so that first three columns displayed can be replaced by the last three columns; I'm thinking a small colored icon/box appears somewhere that toggles which set of 3 columns is visible.
- (better) make tooltip that explains that on screens this size, we recommend using the '=Columns' button to only show three columns at a time. If you would like to view more columns than that, you can scroll horizontally between columns while the leftmost column remains pinned.

TasksPage:

- (style+) Currently Taskform is larger than page, make it a wider form or a two stage form.

Overall (sort to feature/more specific issue for commits)

Navbar UI (style):

- Page navbar - 'Overview' is always highlighted bold
- The current page should always be bolded in the navbar (currently when you click on them they do not highlight bold, unless you click twice...)

Header UI (style):

- Logout button is smashed against theme button
- theme button (moon/daylight) does not work

Overview / Dashboard:

- is currently 4 cards for features, one of which does not exist

Wishful thinking (style)

- more catchy/popping but subtle
  tones and colors (adjust base shadCN themes)

Landing Page (style)

- currently 'Build Buddy' takes a mooment to load as a google font link. Downlooad, incorporate, and hardcode the file so that this doesn't happen
- when you click login or register, the cursor does not automatically appear in the first input (quickly chec convention on this)

Clients Page

- once finished with mod/resp datatable view and mod/resp item view, incorporate them into clients page, and modify components so they're suitable for it.

[www.github.com/Doug-Colin](https://)
