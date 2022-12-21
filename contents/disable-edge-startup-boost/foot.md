1. If you want to re-enable **Startup boost**, you can enable it from `edge://settings/system` page.

    ![](https://joji.blob.core.windows.net/recipe/edge-startup-boost-2.png)

2. If the setting is greyed out, please open **Registry Editor** as administrator and find if any of the following registry keys is set to `0`.

    - HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge\StartupBoostEnabled
    - HKEY_CURRENT_USER\SOFTWARE\Policies\Microsoft\Edge\StartupBoostEnabled

    If either of these keys is present, remove them to allow you manually toggle the setting in the `edge://setting/system` page. Alternatively, you can set the value to `1` to enable **Startup boost**.

    **Note**: If both keys are present, the one in HKEY_LOCAL_MACHINE takes precedence.
