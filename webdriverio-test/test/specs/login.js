describe('Plantly -> [Logging In]', () => {
    // it('should reject incorrect details', () => {
    //     browser.url('http://localhost:3000/login')
        
    //     const wrongLogin = {
    //         username: 'test7',
    //         password: 'banadfadf'
    //     }

    //     $('[name=username]').addValue(wrongLogin.username );
    //     $('[name=password]').addValue(wrongLogin.password);
        
    //     $('button.ui.animated.button').click();
    //     browser.pause(5000);
        
    //     const msg = $('ul.list').getText();

    //     expect(msg).toBe("Incorrect username or password.");
    // })
   
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

// describe('Plantly -> [Adding Devices]', () => {
    
//     it('should reject incorrect devices', () => {
//         $('button.ui.right.floated.primary.button').click();
//         browser.pause(1000);

//         const invalDevice = "abcada"

//         $('input').addValue(invalDevice);
        
//         browser.pause(1000);

//         const button = $("div.actions button");
//         console.log(button)

//         button.click();
//         browser.pause(1000);

//         const msg = $('div.ui.negative.message p');

     
//         expect(msg.getText()).toBe("Device isn't available");
//     })
   
//     it('should accept correct devices', () => {
      
//         const valDevice = "ghzy567"

//         $('input').setValue(valDevice);
        
//         browser.pause(1000);

//         const button = $("div.actions button");
      
//         button.click();
//         browser.pause(1000);

//         var table = $$('table tbody')[0];
//         var devices = table.$$('tr');

//         var contains = false;
        
//         for(var i=0; i < devices.length; i++){
//             if(devices[i].$$('td')[0].getText() == 'ghzy567'){
//                 contains = true;
//                 break;
//             }

//         }
//         expect(contains).toBe(true);
//     })

// })
// describe('Plantly -> [Removing Devices]', () => {
    
//     it('it should unlink devices', () => {
        
//         var table = $$('table tbody')[0];
//         var devices = table.$$('tr');
        
//         for(var i=0; i < devices.length; i++){
//             if(devices[i].$$('td')[0].getText() == 'ghzy567'){
//                 devices[i].$$('td')[2].$$('a')[1].click()
//                 break;
//             }
//         }

//         var contains = "still inside table";

//         browser.pause(5000)
//         var table = $$('table tbody')[0];
//         var devices = table.$$('tr');
        
//         for(var i=0; i < devices.length; i++){
//             if(devices[i].$$('td')[0].getText() == 'ghzy567'){
//                 contains = "still inside table";
//                 break;
//             } else contains = "passed";
//         }
//         expect(contains).toBe("passed");
//     })
   
// })

describe('Plantly -> [Viewing the Dashboard]', () => {
    
    
    it('it should be able to access a device dashboard', () => {
       
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

describe('Plantly -> [Dashboard Interaction]', () => {
    
    it('it should be able to view current device stats', () => {

        browser.pause(3000); 

        var stats =  $$('div.ModuleContent_header__14A6I')[0].getText();
        var graph1 = $$('div.ModuleContent_header__14A6I')[1].getText();
        var server = $$('div.ModuleContent_header__14A6I')[3].getText();

        var result = "Can view: ";

        if (stats == "Current Stats") {
            result += "Stats , ";
        }
        if (graph1 == "Summary") {
            result += "Summary , ";
        }
        if (server == "Server Information") {
            result += "Server";
        }
      

        expect(result).toBe("Can view: Stats , Summary , Server");
    })

    it('it should be able to switch device dashboards', () => {
        
        var deviceSwitch =  $('div.ui.dropdown.Nav_deviceSelect__9tJKa').click();
        
        browser.pause(500);

        var dropdownItem = $$('div.visible.menu.transition')[0].$$('div')[0];
        var dropdownTxt = dropdownItem.$$('span')[0].getText()

        dropdownItem.click();

        browser.pause(3000)
        
        var device = $('h1.subtitle.textOverflow').getText();
       
        expect(device).toBe(dropdownTxt);
    })

    it('it should be able to view device details', () => {
        
        var deviceTab =  $('a.flex.align-center.space').click();
        
        browser.pause(1500);

        var dropdownItem = $$('div.visible.menu.transition')[0].$$('div')[0];
        var dropdownTxt = dropdownItem.$$('span')[0].getText()

        dropdownItem.click();

        browser.pause(3000)
        
        var device = $('h1.subtitle.textOverflow').getText();
       
        expect(device).toBe(dropdownTxt);
    })


   
})

