# HOW TO AMEND THE DATES OF COMMITS:

## Trying to backdate a new commit:

Just run this command after you run your git commit -m (edit for desired times/dates):
(READY FOR NEXT COMMIT 9/7/23)


GIT_COMMITTER_DATE="2023-09-10 08:43:54" git commit --amend --no-edit --date "2023-09-10 08:43:54"

GIT_COMMITTER_DATE="2023-08-15 18:17:49" git commit --amend --no-edit --date "2023- 08-15 18:17:49"

## Automatically generate commands to backdate commits via function:

#### Without commit message:

```JavaScript
function generateGitCommands(date, startTime, endTime) {
  const [startHours, startMinutes, startSeconds] = startTime.split(":").map(Number);
  const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);

  const startTotalSeconds = startHours * 3600 + startMinutes * 60 + startSeconds;
  const endTotalSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;

  const commands = [];

  for (let i = 0; i < 10; i++) {
    const randomTotalSeconds = startTotalSeconds + Math.floor(Math.random() * (endTotalSeconds - startTotalSeconds));
    const hours = String(Math.floor(randomTotalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((randomTotalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(randomTotalSeconds % 60).padStart(2, '0');
    const timestamp = `${hours}:${minutes}:${seconds}`;

    const command = `GIT_COMMITTER_DATE="${date} ${timestamp}" git commit --amend --no-edit --date "${date} ${timestamp}"`;
    commands.push({ command, randomTotalSeconds });
  }

  // Sort the commands based on the time
  commands.sort((a, b) => a.randomTotalSeconds - b.randomTotalSeconds);

  // Extract the sorted commands
  const sortedCommands = commands.map(cmd => cmd.command);

  return sortedCommands.join('\n');
}

// Example usage (don't forget the time values here are not 'American' time, 5:15am is 05:15:00  and 5:15pm is 17:15:00
const date = "2023-08-30";
const startTime = "06:30:24";
const endTime = "23:31:51";
console.log(generateGitDateCommands(date, startTime, endTime));
```

#### With commit message:

```JavaScript
function generateGitDateCommands(date, startTime, endTime) {
  const [startHours, startMinutes, startSeconds] = startTime.split(":").map(Number);
  const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);

  const startTotalSeconds = startHours * 3600 + startMinutes * 60 + startSeconds;
  const endTotalSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;

  const commands = [];

  for (let i = 0; i < 10; i++) {
    const randomTotalSeconds = startTotalSeconds + Math.floor(Math.random() * (endTotalSeconds - startTotalSeconds));
    const hours = String(Math.floor(randomTotalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((randomTotalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(randomTotalSeconds % 60).padStart(2, '0');
    const timestamp = `${hours}:${minutes}:${seconds}`;

    const command =`GIT_COMMITTER_DATE="${date} ${timestamp}" git commit -m "feat(notes):" --date "${date} ${timestamp}"`;
    commands.push({ command, randomTotalSeconds });
  }

 // Sort the commands based on the time
  commands.sort((a, b) => a.randomTotalSeconds - b.randomTotalSeconds);

  // Extract the sorted commands
  const sortedCommands = commands.map(cmd => cmd.command);

  return sortedCommands.join('\n');
}

// Example usage (don't forget the time values here are not 'American' time, 5:15am is 05:15:00  and 5:15pm is 17:15:00
const date = "2023-08-30";
const startTime = "06:30:24";
const endTime = "23:31:51";
console.log(generateGitDateCommands(date, startTime, endTime));

// Example usage (don't forget the time values here are not 'American' time, 5:15am is 05:15:00  and 5:15pm is 17:15:00
const date = "2023-08-30";
const startTime = "06:30:24";
const endTime = "23:31:51";
console.log(generateGitDateCommands(date, startTime, endTime));
```

GIT_COMMITTER_DATE="2023-08-31 09:05:44" git commit -m "chore(FormDialog.tsx): Clean up code by removing comments, making comments more concise, updating comments etc" --date "2023-08-31 09:05:44"

GIT_COMMITTER_DATE="2023-09-02 10:14:21" git commit -m "refactor(): Clean up code by removing/updating/making more concise comments" -m "update import statementf for getErrorMessage axiol Util moved to own file" --date "2023-09-02 10:14:21"

## Git commit message templates/examples:

git commit -m "feat:() "
git commit -m "feat:(Projects) Update ProjectsPage.tsx"
git commit -m "feat:(Tasks) Add routes for tasks feature and update server accordingly"
git commit -m "fix(taskModel): correct schema type for label field to resolve TypeError"
$ git commit -m "feat:(tasks) add taskService & implement token auth & Axios calls for CRUD operations"

## Backdating an out of order commit:

Let's say you are backdating commits and then you need to perform a merge. This will create an automatic merge commit with the current date. If you want to amend the date of that auto commit, you will not be able to do so if it is *dated* as the newest commit.

If last commit, just use git amend. Otherwise could use git rebase. IF that doesn't work, use
***DONT USE built in git filter-branch!!! Mangles work history.

*** DO use git-filter-repo tool:
https://github.com/newren/git-filter-repo#how-do-i-use-it

-install by downloading file from repo (just a txt file; it's a python script)
-rename to git-filter-repo.py (may not be necessary)
-make sure you have python 3.5+ installed (current is 3.11)
-convert the date you want to a Unix timestamp (use https://www.unixtimestamp.com/, a lot of the other pages don't work)
-make sure to append your timezone offset to the unix timestamp after a space
-since windows is a bitch, use following command (python3 `<path-of-git-filter-repo>` ....

```
python3 frontend/project_notes/git_fuckery/git-filter-repo.py --commit-callback '
  if commit.original_id.decode("utf-8") == "e15fe412688252568214a919f6d439d51bcff4b2":
    commit.author_date = b"1691671953 -0400"
    commit.committer_date = b"1691671953 -0400"
'
```


