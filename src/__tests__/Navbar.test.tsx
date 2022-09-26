import {render,screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Pages/Navbar/Navbar';
import sites from '../Assets/sites.json';

it("Navbar-links renders exact quantity",()=>{
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>);
    const elements = [];
    sites.map(site =>{
        elements.push(screen.getByText(site.name));
        return null;
    })
    expect(elements.length).toBe(sites.length);
}) 