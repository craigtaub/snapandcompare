var config = {
    bps : [400, 600, 1000, 1300],
    screens : "screenshots/bp-",
    siteType : "html", 
    cookies : [{
          name: "foo",
          value: "bar",
          domain: "localhost"
        }],
    masterUrl : '<html><body style="background-color:red;"><div>Hello World</div><div style="padding-top:11px;">Whats new?</div></body></html>',
    diffUrl : '<html><body style="background-color:red;"><div>Hello World</div><div style="padding-top:10px;">Whats new?</div></body></html>',
    watchFile : ""
}

module.exports = config;
