function getIP{
(get-netipaddress).ipv4address | Select-String "192*"
}
function getDate{
(Get-Date)
}
$IP = getIP
$User = $env:USERNAME
$ver = $host.Version
$HOST1 = $env:COMPUTERNAME
$DATE = getDate

$BODY = "This machine's IP is $IP. User is $User. Hostname is $HOST1. Powershell $ver. Today's Date is $DATE."

Write-Output $BODY | Out-File C:\it3038c-scripts\powershell\userdevice.txt -Append