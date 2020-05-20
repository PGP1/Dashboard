describe('Plantly -> [Logging In]', () => {
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
        browser.pause(3000);
        

        expect(browser.getUrl()).toBe("http://localhost:3000/");
    })
})

describe('Plantly -> [Adding Devices]', () => {
    
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

})
describe('Plantly -> [Removing Devices]', () => {
    
    it('should reject incorrect devices', () => {
        
        var table = $$('table tbody')[0];
        var devices = table.$$('tr');

        var contains = true;
        
        for(var i=0; i < devices.length; i++){
            if(devices[i].$$('td')[0].getText() == 'ghzy567'){
                devices[i].$$('td')[2].$$('a')[1].click()
                break;
            }
        }
        browser.pause(3000)
        var table = $$('table tbody')[0];
        var devices = table.$$('tr');
        
        for(var i=0; i < devices.length; i++){
            if(devices[i].$$('td')[0].getText() == 'ghzy567'){
                contains = true;
                break;
            } else contains = false;
        }
        expect(contains).toBe(false);
    })
   
})

