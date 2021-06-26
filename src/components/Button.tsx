/*type ButtonProps = {
    text?: string,
    children?: string,
}*/

/* 
    um dos conceitos importantes do react é a imutabilidade,
    ou seje, a partir do momento que criamos uma variável, o 
    valor dela NÃO É ALTERADO, o que acontece é que é CRIADO OU
    SETADO UM NOVO VALOR BASEADO NA INFORMAÇÃO ANTERIOR QUE JÁ ESTAVA.
       
    NÃO MODIFICA INFORMAÇÕES, MAS CRIA NOVAS INFORMAÇÕES NA MEMÓRIA.
*/


//import { useState } from "react";

//export function Button(props: ButtonProps)

import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?:boolean
};

// export function Button(props: ButtonProps) {
    /* 
        ... -> rest operators (resto)
        tudo o que não for isOutlined eu jogo dentro de um objeto props
        assim continuando com o mesmo funcionamento de antes
    */
    export function Button({ isOutlined = false, ...props }: ButtonProps) {
    //let counter = 0;
    
    /*
    const[counter, setCounter] = useState(0);

    function increment() {
        setCounter(counter + 1);
        console.log(counter);
    }
    */

    return (
        //<button>{props.children || ''}</button>
        //<button onClick={increment}>{counter}</button>
        <button className={
            `button ${isOutlined ? 'outlined' : ''}`
        } {...props}/>
    );
}
