import './styles/style.css'
import datalogo from './assets/logo-circulo.svg'
import graph from './data/graph.json'
import { forceGraph } from './force-graph.js'
import { ForceChart } from './force-chart.js'

document.querySelector('#app').innerHTML = `
  <div class="copy">
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${datalogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Migración de Clientes Potenciales <span class="copy__yellow__accent">Coppel Retail</span></h1>
    <p>Para Grupo Coppel, el activo más importante son sus clientes. Es por esto que es primordial estudiar y conocer su comportamiento dentro de la cartera de crédito, para obtener nuevas oportunidades y estrategias de negocio.</p>
    <p>Para analizar el comportamiento de Clientes en relación al estatus de su Ciclo de Vida, utilizamos la Migración de Clientes. Esta herramienta nos ayuda a analizar el comportamiento de los Clientes basándonos en diferentes perfiles dado un estatus inicial y final.</p>
    <p>Actualmente los Clientes de Coppel Retail se distribuyen en 12 perfiles. Estos se clasifican en relación al Estatus del Ciclo de Vida del Cliente.</p>
    <p>Además de estos perfiles, existe un subconjunto Clientes comúnmente conocido como “Clientes Potenciales” que consideramos de suma importancia para el fortalecimiento de la cartera.</p>
    <h2>Clientes Potenciales</h2>
    <p>Esta visualización se centrará en el comportamiento de la cartera de Clientes Potenciales; Activos sin Vencido, Nunca 0-15, Saldado 0-15, Vencidos 1 y Clientes Generados.</p>
    <p>La cartera de clientes potenciales es muy valiosa para Coppel. Por esta razón, la consideramos como una única entidad de clientes con un gran potencial para generar valor a la empresa</p>
    <p>El 2022 inició con un Total de Clientes Potenciales de 14.3 millones, siendo este el mayor número desde 2015.</p>
    <h2>Clientes Z</h2>
    <p>Durante el 2022, los Clientes Potenciales que migraron a Clientes Z representaron el 0.3% de la cartera (menos de 100mil clientes). Esto significó un decremento comparado con los 2 últimos años.</p>
    <h2>Clientes Quebrantados</h2>
    <p>Durante el mismo año, el 0.7% (0.1 millones) de Clientes Potenciales migraron a Clientes Quebrantados, siendo este el menor número desde 2015.</p>
    <h2>Clientes Vencidos 2, 3, +4</h2>
    <p>El menor porcentaje de migración de Clientes Potenciales a Clientes Vencidos 2, 3, +4 fué durante 2021 representando el 11.2% (1.5 millones de clientes). Durante el 2022, 1.9 millones de Clientes Potenciales migraron a Clientes Vencidos 2, 3, +4 (13.9%). Esta representa la segunda menor cantidad durante los últimos 8 años.</p>
    <h2>Clientes Nunca +15</h2>
    <p>Los Clientes Potenciales que migraron a Clientes Nunca +15 representaron el 1.2% (0.2 millones de clientes) durante el 2022</p>
    <h2>Clientes Saldados +15</h2>
    <p>La migración de Clientes Potenciales a Clientes Saldados +15 a mantenido un aumento durante los últimos años, siendo el porcentaje más alto en 2015 (3.6%). Durante 2022, 0.9 millones de Clientes Potenciales migraron a Clientes Saldados +15 (6.5%) siendo este el segundo mayor porcentaje desde el 2015.</p>
    <h2>Clientes Generados</h2>
    <p>Durante el 2022, se generaron casi 3 millones de Clientes, de los cuales 2.6 millones son potenciales, siendo este el mayor número de Clientes Potenciales desde 2015.</p>
    <h2>Conclusión</h2>
    <p>El mayor porcentaje de retención de Clientes Potenciales se presentó en el 2021 con el 79% (10.7 millones), sin embargo, en el 2022 11.1 millones de Clientes permanecieron como potenciales (78%).</p>
                                            
    <p class="read-the-docs">Análisis y Visualización de Datos - 2023</p>
  </div>
  <div class="dots">
  </div>
`

console.log(graph)

const chart = ForceChart(graph, {
  nodeId: d => d.id,
  nodeGroup: d => d.group,
  nodeTitle: d => `${d.id} (${d.group})`,
  width: 680,
  height: 680
})

document.querySelector('.dots').append(chart)

//forceGraph()