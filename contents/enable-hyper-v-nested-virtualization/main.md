1. Enable Hyper-V nested virtualization on the host machine by running the following PowerShell command as an administrator:
   ```powershell
   Set-VMProcessor -VMName "your-vm-name" -ExposeVirtualizationExtensions $true
   ```

   You can get use `Get-VM` command to list all virtual machines on the host and the VM name will be shown in the first column.

2. Ensure that the virtual machine has a minimum of 8 GB of RAM.

3. Ensure that the virtual machine has a minimum of four cores (logical processors).