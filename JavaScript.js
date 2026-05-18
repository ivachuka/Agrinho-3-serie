document.addEventListener("DOMContentLoaded", () => {
    
    // --- LOGICA DE NAVEGAÇÃO (SPA) ---
    const links = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remove classe ativa de todos os links e páginas
            links.forEach(l => l.classList.remove("active"));
            pages.forEach(p => p.classList.remove("active"));

            // Adiciona classe ativa no link clicado e na página alvo
            link.classList.add("active");
            const targetPage = link.getAttribute("data-target");
            document.getElementById(targetPage).classList.add("active");
        });
    });

    // --- LÓGICA DO SIMULADOR DA ESTUFA ---
    const faseSelect = document.getElementById("fase");
    const tempInput = document.getElementById("temp");
    const umidadeInput = document.getElementById("umidade");
    
    const tempVal = document.getElementById("temp-val");
    const umidadeVal = document.getElementById("umidade-val");
    
    const statusIndicator = document.getElementById("status-indicator");
    const feedbackTexto = document.getElementById("feedback-texto");

    // Função para recalcular o status da estufa baseado nas regras de cura do fumo
    function simularEstufa() {
        const fase = faseSelect.value;
        const temp = parseInt(tempInput.value);
        const umidade = parseInt(umidadeInput.value);

        // Atualiza os valores numéricos na tela
        tempVal.innerText = temp;
        umidadeVal.innerText = umidade;

        let statusClass = "";
        let statusMensagem = "";
        let feedback = "";

        // Regras lógicas aproximadas para uma secagem real e sustentável
        if (fase === "amarelamento") {
            // Ideal: Temp entre 32°C e 40°C, Umidade alta (80-90%)
            if (temp >= 32 && temp <= 40 && umidade >= 75 && umidade <= 90) {
                statusClass = "status-excelente";
                statusMensagem = "Ideal: Amarelamento Eficiente";
                feedback = "Excelente equilíbrio! A temperatura moderada e umidade alta permitem que a folha amarele sem secar rápido demais. Consumo de lenha otimizado.";
            } else if (temp > 40) {
                statusClass = "status-perigo";
                statusMensagem = "Crítico: Folha Vai Queimar";
                feedback = "A temperatura está alta demais para o amarelamento. Você vai fixar o verde na folha ou cozinhá-la, estragando o lote e desperdiçando energia calórica.";
            } else {
                statusClass = "status-alerta";
                statusMensagem = "Atenção: Processo Lento";
                feedback = "Temperatura baixa ou umidade inadequada. O amarelamento vai demorar mais, exigindo mais tempo de estufa ligada e maior gasto de recursos.";
            }
        } 
        else if (fase === "murchamento") {
            // Ideal: Temp entre 40°C e 50°C, Umidade caindo (60-70%)
            if (temp >= 40 && temp <= 52 && umidade >= 55 && umidade <= 70) {
                statusClass = "status-excelente";
                statusMensagem = "Ideal: Fixando a Cor";
                feedback = "Perfeito. A umidade está sendo expelida gradualmente pelas janelas de ventilação, e a cor dourada está sendo salva com boa eficiência energética.";
            } else if (umidade > 70) {
                statusClass = "status-alerta";
                statusMensagem = "Risco de Vaporização";
                feedback = "A umidade está muito alta! Abra os registros/venezianas da estufa para o ar úmido sair, senão as folhas vão escurecer pelo excesso de vapor.";
            } else {
                statusClass = "status-perigo";
                statusMensagem = "Desequilíbrio Térmico";
                feedback = "Ajuste os parâmetros. Forçar o calor agora sem controlar a umidade estraga a textura da folha e joga calor gerado fora.";
            }
        }
        else if (fase === "secagem-lamina") {
            // Ideal: Temp entre 55°C e 62°C, Umidade baixa (30-45%)
            if (temp >= 53 && temp <= 62 && umidade >= 30 && umidade <= 50) {
                statusClass = "status-excelente";
                statusMensagem = "Ideal: Secagem da Lâmina";
                feedback = "Muito bem. A lâmina da folha está secando perfeitamente. O calor está concentrado e controlado para evitar picos que gastem lenha desnecessariamente.";
            } else {
                statusClass = "status-alerta";
                statusMensagem = "Fora da Faixa Ideal";
                feedback = "Para secar a lâmina da folha, a temperatura precisa subir gradativamente até perto dos 60°C, mantendo a umidade baixa.";
            }
        }
        else if (fase === "secagem-talo") {
            // Ideal: Temp alta (65°C a 72°C), Umidade muito baixa (<25%)
            if (temp >= 65 && temp <= 75 && umidade <= 25) {
                statusClass = "status-excelente";
                statusMensagem = "Ideal: Fase Final (Talo)";
                feedback = "Fase mais crítica de consumo de energia. Manter em 70°C com umidade baixa elimina a água do talo grosso. Monitore para desligar assim que concluir e poupar biomassa.";
            } else if (temp > 75) {
                statusClass = "status-perigo";
                statusMensagem = "Desperdício e Risco de Incêndio";
                feedback = "Temperatura acima de 75°C aumenta drasticamente o risco de incêndio na estufa e consome lenha de forma predatória sem necessidade técnica!";
            } else {
                statusClass = "status-alerta";
                statusMensagem = "Talo Ainda Úmido";
                feedback = "Se a temperatura ficar baixa nesta fase, o talo não seca. Fumo com talo úmido mofa no galpão, arruinando todo o esforço anterior.";
            }
        }

        // Atualiza a interface gráfica do painel com as classes corretas
        statusIndicator.className = "status-indicator " + statusClass;
        statusIndicator.innerText = statusMensagem;
        feedbackTexto.innerText = feedback;
    }

    // Ouvintes de eventos (Listeners) para atualizar o simulador a cada alteração do usuário
    faseSelect.addEventListener("change", simularEstufa);
    tempInput.addEventListener("input", simularEstufa);
    umidadeInput.addEventListener("input", simularEstufa);

    // Executa a simulação pela primeira vez para inicializar a tela com dados válidos
    simularEstufa();
});