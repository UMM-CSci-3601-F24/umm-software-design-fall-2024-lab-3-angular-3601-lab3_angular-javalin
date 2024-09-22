import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {
  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct page title', () => {
    page.getPageTitle().should('eq', 'Todos');
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for owner 'Barry'
    cy.get('[data-test=todoOwnerInput]').type('Barry');

    // All of the user cards should have the name we are filtering by
    page.getTodoPanels().each($panel => {
      cy.wrap($panel).find('.mat-expansion-panel-body').should('have.text', 'Barry');
    });

    // (We check this two ways to show multiple ways to check this)
    page
      .getTodoPanels()
      .find('.todo-panel-owner')
      .each($name => expect($name.text()).to.equal('Barry'));
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for company 'OHMNET'
    cy.get('[data-test=todoCategoryInput]').type('video games');

    page.getTodoPanels().should('have.lengthOf.above', 0);

    // All of the user cards should have the company we are filtering by
    page
      .getTodoPanels()
      .find('.todo-panel-category')
      .each($card => {
        cy.wrap($card).should('have.text', 'video games');
      });
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    // Filter for companies that contain 'ti'
    cy.get('[data-test=todoCategoryInput]').type('es');

    page.getTodoPanels().should('have.lengthOf', 2);

    // Each user card's company name should include the text we are filtering by
    page.getTodoPanels().each(e => {
      cy.wrap(e).find('.todo-panel-category').should('include.text', 'es');
    });
  });
  });

