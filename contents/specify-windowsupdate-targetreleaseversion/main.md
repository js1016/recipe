1. We can specify which `Windows product version` and `target version for Feature Updates` we would like to receive.

    - For the `Windows product version`, the acceptable values can be `Windows 10` and `Windows 11`. For more information about Windows product versions, you can refer to <https://aka.ms/WindowsTargetVersioninfo>.
    - For the `Target version for Feature Updates`, the acceptable can be `21H1`, `22H2`, etc. To know the release information of each Windows product, you can check: <https://learn.microsoft.com/en-us/windows/release-health/release-information>

2. After determining the `Windows product version` and the `target version for Feature Updates`, you can apply the settings using one of the following methods:

    1. Using following registry file, put the `Windows production version` in `ProductVersion`, and the `Target version for Feature Updates` in `TargetReleaseVersionInfo`. For example, if you would like to receive Feature Updates no newer than `Windows 10 22H2`, then following registry file does the work.

        ```
        Windows Registry Editor Version 5.00

        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate]
        "TargetReleaseVersion"=dword:00000001
        "ProductVersion"="Windows 10"
        "TargetReleaseVersionInfo"="22H2"
        ```

    2. Using group policy, navigate to setting: **Computer Configuration** -> **Administrative Templates** -> **Windows Components** -> **Windows Update** -> **Windows Update for Business** -> **Select the target Feature Update version**, enable this setting and then input the desired `Windows product version` and `Target version for Feature Updates` in the corresponding text boxes.

        ![](https://joji.blob.core.windows.net/recipe/specify-windowsupdate-targetreleaseversion-1.png)
