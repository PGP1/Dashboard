describe('US: 3.5.10 Register account via Cognito API.', () => {
    it('should reject incorrect details', () => {
        browser.url('http://localhost:3000/register')
        
        
        const rand = Math.floor((Math.random() * 10000) + 1);

        const wrongLogin = {
            email: `test${rand}@gmail.com`,
            username: 'test7',
            password: 'banadfadf'
        }
        
        $('[name=email]').addValue(wrongLogin.email);
        $('[name=username]').addValue(wrongLogin.username);
        $('[name=password]').addValue(wrongLogin.password);

        $('button.ui.animated.button').click();
        browser.pause(5000);

        const msg = $('ul.list').getText();

        expect(msg).toBe("User already exists");
    });

    it('should accepts correct details', () => {
        browser.url('http://localhost:3000/register')
        
        
        const rand = Math.floor((Math.random() * 10000) + 1);

        const login = {
            email: `test${rand}@gmail.com`,
            username: `test${rand}`,
            password: 'banadfadf'
        }
        
        $('[name=email]').addValue(login.email);
        $('[name=username]').addValue(login.username);
        $('[name=password]').addValue(login.password);

        $('button.ui.animated.button').click();
        browser.pause(5000);

        const msg = $('code').getText();

        expect(msg).toBe(login.email);
    }); 
})