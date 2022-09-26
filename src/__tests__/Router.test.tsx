import  ReactDOM  from 'react-dom/client';
import Router from '../Pages/Router/Router';

it('Router exists and works',()=>{
    const div = document.createElement('div');
    //@ts-ignore
    const root = ReactDOM.createRoot(div);
    root.render(<Router />);
    expect(div.innerHTML).toBeDefined();
})