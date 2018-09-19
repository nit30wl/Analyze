function genericOnClick(info, tab) {
var input=info.selectionText.toLowerCase()

//validate selection

var domainoripre=/([a-z0-9\-]+(\.[a-z0-9-]+)*\.([a-z]{2,}|xn\-\-[a-z0-9\.]+))|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/
var m=domainoripre.exec(input)
if (m){//valid

//don't search local values
if (/^10\..+|^192\.168\..+|^127\..*/.test(m[0]) || /.*\.local$/.test(m[0])){
  sarcasm=["I'm afraid I can't do that Dave", "You want to see my privates?!",
    "There is no try", "Palm - meet Face"]
  alert(sarcasm[(Math.random()*sarcasm.length).toFixed(0)])
}else {
  if (m[1]){ //domain
    chrome.storage.sync.get({
      //'https://www.infosniper.net/?domain=%s'
      'domUrl': ['https://shodan.io/search?query=%s','https://censys.io/ipv4?q=%s','https://virustotal.com/search/?query=%s','https://cymon.io/domain/%s','https://www.threatcrowd.org/domain.php?%s','https://exchange.xforce.ibmcloud.com/url/%s','https://quttera.com/sitescan/%s','https://sitecheck.sucuri.net/results/%s','https://urlquery.net/search?q=%s']
    }, function(items) {
      doSearch(items.domUrl, m[0], tab);
    });
  }
  if (m[4]){ //ip
    chrome.storage.sync.get({
      //'https://www.infosniper.net/?ip_address=%s'
      'ipUrl': ['https://shodan.io/host/%s','https://censys.io/ipv4/%s','https://virustotal.com/search/?query=%s','https://cymon.io/%s','https://www.threatcrowd.org/ip.php?ip=%s','https://www.alienvault.com/apps/api/threat/ip/%s','https://exchange.xforce.ibmcloud.com/ip/%s','https://urlquery.net/search?q=%s', 'https://www.abuseipdb.com/check/%s']
    }, function(items) {
      doSearch(items.ipUrl, m[0], tab);
    });
  }
}
} else {
alert("Invalid Selection - '"+input+"'\nPlease highlight a domain or IPv4 address")
}
}

function doSearch(searchurl, input, tab){
for (var i = 0; i < searchurl.length; i++) {
  newurl = searchurl[i].replace('%s', input)
  chrome.tabs.create({"url": newurl});
  //chrome.windows.create({"url": newurl});
}

}



var id = chrome.contextMenus.create({"title": "Check '%s' with test", "contexts":["selection"],
                                     "onclick": genericOnClick});


//https://www.domainiq.com/domain?%s', 'ipUrl': 'https://www.domainiq.com/ip?%s'
