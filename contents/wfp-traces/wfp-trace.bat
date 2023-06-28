@echo off
ECHO These commands will enable tracing:
@echo on
netsh wfp capture start
logman create trace "network-wfp" -ow -o network-wfp.etl -p "Microsoft-Windows-WFP" 0xffffffffffffffff 0xff -nb 16 64 -bs 1024 -mode Circular -f bincirc -max 4096 -ets
logman update trace "network-wfp" -p "Microsoft-Windows-BfeTriggerProvider" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Base-Filtering-Engine-Connections" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Base-Filtering-Engine-Resource-Flows" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Base-Filtering-Engine-Connections" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p {4E7A902B-5E4E-5209-668D-86090D23E202} 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p {2588030C-920E-4AD5-ACBF-8AA2CD761DDB} 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-NetworkSecurity" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p {106B464A-8043-46B1-8CB8-E92A0CD7A560} 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-TCPIP" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p {B40AEF77-892A-46F9-9109-438E399BB894} 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p {DD7A21E6-A651-46D4-B7C2-66543067B869} 0xfffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-DriverFrameworks-KernelMode" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p {EC044B58-3D13-4880-936F-7B67DFB3E056} 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-NetworkController-FirewallService" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Windows Firewall With Advanced Security" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Firewall" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Dhcp-Client" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-DHCPv6-Client" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Dhcp-Nap-Enforcement-Client" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-NDIS" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-WWAN-SVC-EVENTS" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-WWAN-UI-EVENTS" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-WWAN-MM-EVENTS" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-WWAN-NDISUIO-EVENTS" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-NWiFi" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-VWiFi" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-L2NACP" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-WLAN-AutoConfig" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-EapHost" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-OneX" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Wired-AutoConfig" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-Iphlpsvc-Trace" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-WebIO" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-BranchCacheEventProvider" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-BranchCacheClientEventProvider" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-NCSI" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-NlaSvc" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "Microsoft-Windows-NetworkProfile" 0xffffffffffffffff 0xff -ets
logman update trace "network-wfp" -p "{EB004A05-9B1A-11D4-9123-0050047759BC}" 0xffffffffffffffff 0xff -ets

@echo off
echo
ECHO Reproduce your issue and enter any key to stop tracing
@echo on
pause
logman stop "network-wfp" -ets
netsh wfp capture stop
netsh wfp show filters