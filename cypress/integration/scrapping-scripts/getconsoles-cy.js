// Cypress installation Mac /Users/macbookair/Library/Caches/Cypress/3.1.4

context('Scrapping console list', () => {
    var baseUrl = "https://downloads.khinsider.com";
    var apiSaveConsolesUrl = "http://localhost:8080/api/consoles"
    var sectionUrl = "/console-list";
    let consoleList = [];

    it('1) GET consolesList', () => {
        cy.visit(baseUrl + sectionUrl)
        cy.get("#EchoTopic a").each( ($el, i) => {
            consoleList.push({
                'name': $el.text(),
                'url': baseUrl + $el.attr('href'),
                'albums': [],
                'size': $el.prev().next()[0].nextSibling.nodeValue.trim()
            })
        })
        
    })
    it('2) GET albums/urls for each console & SAVE to DB', () => {
        // for (let i=0; i<3; ++i){
        for (let i=0; i<consoleList.length; i++){
            let albumsList = [];
            cy.visit(consoleList[i].url)
            cy.get("#EchoTopic p a").each( ($el, i) => {
                albumsList.push({
                    'name': $el.text(),
                    'url': $el.attr('href')
                });
            }).then( () => {
                Object.assign(consoleList[i].albums, albumsList);
                return consoleList[i];
            }).then( insertConsoleItem => {
                // API Save to DB one by one
                if (insertConsoleItem) {
                    cy.request('POST', apiSaveConsolesUrl, insertConsoleItem )
                    .then((response) => {
                        expect(response.status).to.equals(200);
                    })
                }
            })
        }
    })
})
