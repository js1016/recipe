1. Check if any Edge crash dumps have been created at `%LOCALAPPDATA%\Microsoft\Edge\User Data\Crashpad\reports`, you may zip the entire `reports` folder to reduce the dump file size.

    **Note**: for other channels, the dump location will be `%LOCALAPPDATA%\Microsoft\Edge <channel>\User Data\Crashpad\reports`, where `<channel>` is `SxS` (Canary), `Dev` or `Beta`.

2. Since full crash dumps take up a lot of disk space, it is suggested to remove the user variable: `ENABLE_HEAP_DUMPS` if full crash dumps are no longer needed.

    ![](https://joji.blob.core.windows.net/recipe/edge-crashpad-full-dump-3.png)
