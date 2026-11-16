# Pocket Puzzles

Seven small puzzle games for the phone, each with a daily puzzle and 75 levels: Bloom, Even, Trail, Six, Plots, Weave and Mini. Live at https://matthewrios.github.io/puzzles/ once merged.

- Single file: `index.html`. No build step. Puzzles are generated in the browser from a seed, so a level is the same on every device.
- Progress, times and streaks are saved in the browser's local storage. The home screen has "Back up or restore progress" to move them between devices.
- Feedback, error reports and solved-puzzle results post to `CONFIG.endpoint` in `index.html`, a Google Apps Script web app (`apps-script.gs`) that writes to the "Pocket Puzzles log" Google Sheet. While the endpoint is empty, they queue on the device and send once it is set.
