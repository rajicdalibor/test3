const users_name = 'Vladan Djordjevic';
const username = 'vladan@3ap.ch';
const SERVER_HOME = 'http://localhost:3000/';

describe('End2End testing', function() {
  context('Oauth2 login', function() {
    it('Visit login page', function() {
      cy.clearLocalStorage();
      cy.clearCookies();
      cy.visit(SERVER_HOME);
    });

    it('Click login button', function() {
      cy.get('[data-testid="login-button"]').click();
    });

    it('Enter name', function() {
      cy.get('[data-testid="auth-name"]').type(users_name);
    });

    it('Enter email', function() {
      cy.get('[data-testid="auth-email"]').type(username);
    });

    it('Submit credential', function() {
      cy.get('form').submit();
      cy.wait(1000);
    });

      /*TODO: Check why session id has changed for harvest
          it('Visit time page', function() {
            cy.get('[data-testid="menu-time"]').click();
            cy.wait(2000);
          });
          it('Connect to harvest', function() {
            cy.wait(5000);
            cy.get('[data-testid="auth-name"]').type(users_name);
            cy.get('[data-testid="auth-email"]').type(username);
            cy.get('form').submit();
          });
      it('Visit profile page', function() {
        cy.wait(500);
        cy.get('[data-testid="menu-profile"]').click();
      });

      it('Connect to harvest', function() {
        // cy.get('[data-testid="connect-to-harvest-button"]').click();

        cy.get('#name').type(users_name);
        cy.get('#email').type(users_name);
        cy.get('form').submit();
      });

      it('Check if harvest is connected', function() {
        cy.visit(SERVER_HOME + 'profile');
      });

      it('Get all users list', function() {
        cy.get('[data-testid="menu-time"]').click();
        cy.wait(500);
      });
          it('Get overtime for first user', function() {
            cy.get('ul li:first a').click();
          });
      */
    it('Get team page', function() {
      cy.get('[data-testid="menu-team"]').click();
    });

    it('Logout user', function() {
      cy.get('[data-testid="icon-dropdown"]').click();
      cy.get('[data-testid="icon-logout"]').click();
    });
  });
});
