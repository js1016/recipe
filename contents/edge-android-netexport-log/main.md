1. Navigate to `edge://net-export/` in Edge. Ensure that `Include raw bytes (will include cookies and credentials)` is selected so that we capture useful authentication information.

    ![](https://joji.blob.core.windows.net/recipe/edge-android-netexport-log-1.jpg)

    Note: If you have captured Network log previously, then you might not see this page, you need to click the **Start Over** button for a new capture.

2. Click the **Start Logging to Disk** button to start the trace. This tab should remain open while reproducing the issue.
3. Open a different tab and navigate to the URL where you want to demonstrate the symptom.
