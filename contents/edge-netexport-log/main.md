1. Navigate to `edge://net-export/`. Ensure that `Include raw bytes (will include cookies and credentials)` is selected so that we capture useful authentication information.

    ![](https://joji.blob.core.windows.net/recipe/edge-netexport-1.png)

2. Click the **Start Logging to Disk** button to start the trace. Select the folder where you want to save the `edge-net-export-log.json`. This tab should remain open while reproducing the issue.
3. Open a different tab and navigate to the URL where you want to demonstrate the symptom.
