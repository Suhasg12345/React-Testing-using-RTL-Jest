import { screen, render } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";
import {createServer} from '../test/server'
//Goal:
createServer([
    {
        path: '/api/repositories',
        methods: 'get',
        res: (req) => {
            return {
                items: [ {
                            id: 1, full_name: `${language}_one`
                        },
                        {
                            id: 2, full_name: `${language}_two`
                        }]
            }
        }
    }
])

test("data fetch mocking for two links", async () => {

    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    )

    //Loop over each language
    const languages = [
        'javascript', 'typescript', 'rust', 'go', 'python', 'java'
    ]

    for (let language of languages) {
        // For each language, make sure we can have two link
        const links = await screen.findAllByRole('link', {
            name: new RegExp(`${language}_`)
        });
        expect(links).toHaveLength(2)
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`)
        expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`)


    }
    // Asser that the links have the appropriatee full_name
})
