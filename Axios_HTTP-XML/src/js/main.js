const statusEl = document.getElementById("status");
const dataEl = document.getElementById("data");
const headersEl = document.getElementById("headers");
const configEl = document.getElementById("config");

const get = () => {
    const config = {
        params: {
            _limit: 5,
        },
    };
    axios
        .get("https://jsonplaceholder.typicode.com/posts", config)
        .then((response) => renderOutput(response));
};

const post = () => {
    const data = {
        title: "Klysman",
        body: "bar",
        userId: 1,
    };
    axios
        .post("https://jsonplaceholder.typicode.com/posts", data)
        .then((response) => renderOutput(response));
};

const put = () => {
    /* ideal para substituir todos os campos dos dados. */
    const data = {
        title: "Klysman",
        body: "bar",
        userId: 1,
    };
    axios
        .put("https://jsonplaceholder.typicode.com/posts/1", data)
        .then((response) => renderOutput(response));
};

const patch = () => {
    /* para correções pequenas nos dados */
    const data = {
        title: "Klysman2",
        body: "bar2",
    };
    axios
        .patch("https://jsonplaceholder.typicode.com/posts/1", data)
        .then((response) => renderOutput(response));
};

const del = () => {
    /* para deletar um dado do servidor */
    const id = 12;
    axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => renderOutput(response));
};

const multiple = () => {
    /* para multiplos pedidos em uma requisição */
    Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/users?_limit=5"),
    ]).then((responses) => {
        console.table(responses[0].data);
        console.table(responses[1].data);
    });
};

const transform = () => {
    /* para trasnformar o dado apos a consulto e antes de rendereizar na tela */
    const config = {
        params: {
            _limit: 5,
        },
        transformResponse: [
            function (data) {
                const payload = JSON.parse(data).map((objeto) => {
                    return {
                        title: objeto.title,
                    };
                });
                return payload;
            },
        ],
    };
    axios
        .get("https://jsonplaceholder.typicode.com/posts", config)
        .then((response) => renderOutput(response));
};

const errorHandling = () => {
    /* para tratamento de erros em consultas */
    axios
        .get("https://jsonplaceholder.typicode.com/postsz")
        .then((response) => renderOutput(response))
        .catch((error) => renderOutput(error.response));
};

/* metodo para cancelar uma requisição em andamento */
const cancel = () => {
    const controller = new AbortController();
    const config = {
        params: {
            _limit: 5,
        },
        signal: controller.signal,
    };
    axios
        .get("https://jsonplaceholder.typicode.com/posts", config)
        .then((response) => renderOutput(response))
        .catch((e) => {
            console.log(e.message);
        });

    controller.abort();
};

const clear = () => {
    statusEl.innerHTML = "";
    statusEl.className = "";
    dataEl.innerHTML = "";
    headersEl.innerHTML = "";
    configEl.innerHTML = "";
};

const renderOutput = (response) => {
    // Status
    const status = response.status;
    statusEl.removeAttribute("class");
    let statusElClass =
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium";
    if (status >= 500) {
        statusElClass += " bg-red-100 text-red-800";
    } else if (status >= 400) {
        statusElClass += " bg-yellow-100 text-yellow-800";
    } else if (status >= 200) {
        statusElClass += " bg-green-100 text-green-800";
    }

    statusEl.innerHTML = status;
    statusEl.className = statusElClass;

    // Data
    dataEl.innerHTML = JSON.stringify(response.data, null, 2);
    Prism.highlightElement(dataEl);

    // Headers
    headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
    Prism.highlightElement(headersEl);

    // Config
    configEl.innerHTML = JSON.stringify(response.config, null, 2);
    Prism.highlightElement(configEl);
};

document.getElementById("get").addEventListener("click", get);
document.getElementById("post").addEventListener("click", post);
document.getElementById("put").addEventListener("click", put);
document.getElementById("patch").addEventListener("click", patch);
document.getElementById("delete").addEventListener("click", del);
document.getElementById("multiple").addEventListener("click", multiple);
document.getElementById("transform").addEventListener("click", transform);
document.getElementById("cancel").addEventListener("click", cancel);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("clear").addEventListener("click", clear);
