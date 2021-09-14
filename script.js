const continents = document.getElementById('continent')
const countrylist = document.getElementById('country')

fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        query: `
        query {
            continents {
                name
                code
            }
        }`
    })
}).then(res => res.json())
.then(data => {
    data.data.continents.forEach(val => {
        const opt = document.createElement('option')
        opt.value = val.code
        opt.innerText = val.name
        continents.append(opt)
    });
})

continents.addEventListener('change', async e => {
    const continentcode = e.target.value
    const countries = await getContinentCountry(continentcode)
    console.log(countries)
})

function getContinentCountry(continentcode){
    return fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        variables: {code: continentcode},
        query: `
        query getCountry($code: ID!){
            continent(code: $code){
              countries{
                name
              }
            }
          }
        `
    })
}).then(res => res.json())
.then(data => {
    return data.data.continent.countries.forEach(val => {
        const opt = document.createElement('div')
        opt.innerText = val.name
        countrylist.append(opt)
    });
})
}