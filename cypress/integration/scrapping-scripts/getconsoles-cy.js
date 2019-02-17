// Cypress installation Mac /Users/macbookair/Library/Caches/Cypress/3.1.4

context('Scrapping console list', () => {
    var baseUrl = "https://downloads.khinsider.com";
    var apiSaveConsolesUrl = "http://localhost:8080/api/consoles"
    var sectionUrl = "/console-list";
    let consoleList = [];
    let albumsList = [];

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
    it('2) SAVE (POST) consoles + albums/songs to API', () => {
        if (consoleList && consoleList.length > 0)
        cy  .request('POST', apiSaveConsolesUrl, { consoleList })
            .then((response) => {
                debugger
                // response.body is automatically serialized into JSON
                // expect(response.body).to.have.property('name', 'Jane') // true
            })
    })
    it('3) GET albums/urls for each console', () => {
        for (let i=0; i<3; ++i){
        // for (let i=0; i<consoleList.length; i++){
            cy.visit(consoleList[i].url)
            cy.get("#EchoTopic p a").each( ($el, i) => {
                albumsList.push({
                    'name': $el.text(),
                    'url': $el.attr('href')
                });
            }).then( () => {
                Object.assign(consoleList[i].albums, albumsList);
            })
            if(i==2) {
                console.log('consoleList:', consoleList)
                debugger
            }
        }
        xit('insert albums in consoles collection', () => {
            if (consoleList && consoleList.length > 0)
            cy  .request('POST', apiSaveConsolesUrl, { consoleList })
                .then((response) => {
                    debugger
                    // response.body is automatically serialized into JSON
                    // expect(response.body).to.have.property('name', 'Jane') // true
                })
        })
    })
})
