describe('US 3.5.1.1: User Authentication functionality.', () => {
    it('should reject incorrect details', () => {
        browser.url('http://localhost:3000/login')
        
        const wrongLogin = {
            username: 'test7',
            password: 'banadfadf'
        }

        $('[name=username]').addValue(wrongLogin.username );
        $('[name=password]').addValue(wrongLogin.password);
        
        $('button.ui.animated.button').click();
        browser.pause(5000);
        
        const msg = $('ul.list').getText();

        expect(msg).toBe("Incorrect username or password.");
    })
   
    it('should login on correct details', () => {
        browser.url('http://localhost:3000/login')
        
        const login = {
            username: 'test7',
            password: 'a12345678'
        }

        $('[name=username]').addValue(login.username );
        $('[name=password]').addValue(login.password);
        
        $('button.ui.animated.button').click();
        browser.pause(5000);
        

        expect(browser.getUrl()).toBe("http://localhost:3000/");
    })
})

describe('US 3.5.3.2: Device Linkage functionality', () => {
    
    it('should reject incorrect devices', () => {
        $('button.ui.right.floated.primary.button').click();
        browser.pause(1000);

        const invalDevice = "abcada"

        $('input').addValue(invalDevice);
        
        browser.pause(1000);

        const button = $("div.actions button");
        console.log(button)

        button.click();
        browser.pause(1000);

        const msg = $('div.ui.negative.message p');

     
        expect(msg.getText()).toBe("Device isn't available");
    })
   
    it('should accept correct devices', () => {
      
        const valDevice = "ghzy567"

        $('input').setValue(valDevice);
        
        browser.pause(1000);

        const button = $("div.actions button");
      
        button.click();
        browser.pause(1000);

        var table = $$('table tbody')[0];
        var devices = table.$$('tr');

        var contains = false;
        
        for(var i=0; i < devices.length; i++){
            if(devices[i].$$('td')[0].getText() == 'ghzy567'){
                contains = true;
                break;
            }

        }
        expect(contains).toBe(true);
    })

});

describe('US 3.5.5: Device removal functionality', () => {
    
    it('should unlink devices', () => {
        
        var table = $$('table tbody')[0];
        var devices = table.$$('tr');
        
        for(var i=0; i < devices.length; i++){
            if(devices[i].$$('td')[0].getText() == 'ghzy567'){
                devices[i].$$('td')[2].$$('a')[1].click()
                break;
            }
        }

        var contains = "still inside table";

        browser.pause(5000)
        var table = $$('table tbody')[0];
        var devices = table.$$('tr');
        
        for(var i=0; i < devices.length; i++){
            if(devices[i].$$('td')[0].getText() == 'ghzy567'){
                contains = "still inside table";
                break;
            } else contains = "passed";
        }
        expect(contains).toBe("passed");
    })
   
})

describe('US 3.5.1: Dashboard front end', () => {
    
    
    it('should be able to access a device dashboard', () => {
       
        browser.pause(3000)
        
        var table = $$('table tbody')[0];
        var devices = table.$$('tr');

        for(var i=0; i < devices.length; i++){
            if(devices[i].$$('td')[0].getText() == 'test132452'){
                devices[i].$$('td')[2].$$('a')[0].click()
                break;
            }
        }
        browser.pause(3000);
        var result= ""
        var page = $('h1.title').getText();
        var device = $('h1.subtitle.textOverflow').getText();

        if(page == "Dashboard" && device == "test132452"){
            result = "passed";
        } else if (page == "Dashboard" && device != "test132452") {
            result = "incorrect dashboard";
        } else { result = "fail"}


        expect(result).toBe("passed");
    })
   
})

describe('US 3.5.3.3: Device status connection dashboard', () => {
    
    it('should be able to view current device stats', () => {

        browser.pause(3000); 

        var stats =  $$('div[class*="ModuleContent_header"]')[0].getText();
        var graph1 = $$('div[class*="ModuleContent_header"]')[1].getText();
        var server = $$('div[class*="ModuleContent_header"]')[3].getText();

        var result = "Can view: ";

        if (stats.indexOf("Current Stats") > -1) {
            result += "Stats, ";
        }
        if (graph1.indexOf("Summary") > -1) {
            result += "Summary, ";
        }
        if (server.indexOf("Server Information") > -1) {
            result += "Server";
        }
      

        expect(result).toBe("Can view: Stats, Summary, Server");
    })

    it('should be able to switch device dashboards', () => {
        $('div.ui.dropdown[class*="Nav_deviceSelect"]').click();

        browser.pause(500);

        var dropdownItem = $$('div.visible.menu.transition')[0].$$('div')[0];
        var dropdownTxt = dropdownItem.$$('span')[0].getText()

        dropdownItem.click();

        browser.pause(3000)
        
        var device = $('h1.subtitle.textOverflow').getText();
       
        expect(device).toBe(dropdownTxt);
    })
})

describe('US 3.5.4: Elastic search', () => {
    it('should be able to see elastic search server status', () => {
        let msg = $('.c-green').getText();
        let a = $('//*[@id="__next"]/div/div/div[1]/div[3]/ul/li[2]/a');
        a.click();
        expect(msg).toBe("Online");
    });
    
    it('should be able to see Device Status', () => {
        let title =  $$('div[class*="ModuleContent_header"]')[0].getText(); 
        expect(title).toBe("Device Status");
    });

    it('should be able to see Device Control', () => {
        let title =  $$('div[class*="ModuleContent_header"]')[1].getText(); 
        expect(title).toBe("Device Controls");
    });

    it('should be able to see CPU information', () => {
        let title =  $$('div[class*="ModuleContent_header"]')[2].getText(); 
        expect(title).toBe("CPU Information (%)");
    });

    it('should be able to see RAM information', () => {
        let title =  $$('div[class*="ModuleContent_header"]')[4].getText(); 
        expect(title).toBe("RAM Information (%)");
    }); 
});


describe('US 1.6: Video Streaming of Plants', () => {
    it('should be able to see Video Streaming service', () => {
        let title =  $$('div[class*="ModuleContent_header"]')[3].getText(); 
        expect(title).toBe("Live Stream");
    });
});


describe('US 3.8: AWS Socket API', () => {
    it('Should be able to see WebSocket notification', () => {
        $('//*[@id="__next"]/div/div/div[2]/div[1]/div[2]/div[2]').click();
        browser.pause(3000);

        let prediction = $('#__next > div > div > \
                            div.Dashboard_dashboardContent__1pwPU > \
                            div.Nav_nav__2uFc7.flex.align-center > \
                            div.flex.align-center.space-between.Nav_items__2gTTd > \
                            div.Nav_topNotification__2iMpG > div > \
                            div.NotificationPopup_notification___HocX \
                            > div > span');

        prediction = prediction.getText() !== "";

        expect(prediction).toBe(true);
    });
});