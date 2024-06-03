"use strict";
;
;
class CreateTableByJson {
    table;
    data;
    headers;
    html_options;
    fns;
    constructor(data, headers, table) {
        this.table = table ? table : this.createTable();
        this.data = data;
        this.headers = headers;
        this.html_options = {};
        this.fns = {};
    }
    playFn(key, prop) {
        return this.fns[key](prop ?? null);
    }
    addFunction(key, fn) {
        this.fns[key] = fn;
    }
    HtmlOptionSet(opt) {
        if (opt) {
            for (const key in opt) {
                this.html_options[key] = opt[key];
            }
        }
        else {
            throw new Error;
        }
    }
    HtmlOptionDelete(opt) {
        if (opt.length > 0) {
            opt.forEach(key => {
                delete this.html_options[key];
            });
        }
    }
    setHtmlAtribute(html, opts) {
        for (const key in opts) {
            html.setAttribute(key, opts[key]);
        }
    }
    createCell(type, inner_text, option) {
        const cell = document.createElement(type);
        if (option) {
            option(cell);
        }
        cell.innerText = inner_text;
        return cell;
    }
    createRow(str) {
        const tr = document.createElement('tr');
        for (let i = 1; i < 8; i++) {
            const td = this.createCell(str, 'Iteração: ' + i);
            tr.appendChild(td);
        }
        return tr;
    }
    createThead() {
        const thead = document.createElement('thead');
        thead.appendChild(this.createRow('th'));
        return thead;
    }
    createTbody() {
        const tbody = document.createElement('tbody');
        for (let i = 0; i < 20; i++) {
            tbody.appendChild(this.createRow('td'));
        }
        return tbody;
    }
    createTfoot() {
        const tfoot = document.createElement('tfoot');
        tfoot.appendChild(this.createRow('th'));
        return tfoot;
    }
    createTable() {
        const table = document.createElement('table');
        table.appendChild(this.createThead());
        table.appendChild(this.createTbody());
        table.appendChild(this.createTfoot());
        return table;
    }
}
const data_c1 = { data: "key", item: 25, teste: { kest: "Teste", id: 75 }, date: "2024-11-05" };
const headers_c1 = { 'data': 'Teste', 'item.kest': 'Testando Aninhado', 'date': 'Data da Compra' };
const c1 = new CreateTableByJson(data_c1, headers_c1);
document.body.appendChild(c1.table);
c1.setHtmlAtribute(c1.table, { 'data-columref': 'Teste', 'class': 'Classe-Teste' });
c1.HtmlOptionSet({ 'Header.test': 'Oloi', 'Sabato': 'Teste', 'Teste.teste': 'De Teste que testa os teste' });
c1.HtmlOptionDelete([]);
function nomeada() {
    console.log("nomeada");
}
function teste2() {
    console.log("teste2");
}
function norm() {
    let c = c1.createCell("td", 'Sera que esse tipo de coisa é realmente util? Provavel, mas talvez não desse jeito');
    return c;
}
function fnAtribuicao(c) {
    const tr = c.createRow('td');
    tr.style.color = 'red';
    console.log(tr);
}
c1.addFunction('chave', nomeada);
c1.addFunction('teste2', teste2);
c1.addFunction('norm', norm);
c1.addFunction('teste', fnAtribuicao);
let c = c1.playFn('teste', (c1));
console.log(c);
