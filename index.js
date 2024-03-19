import { XYContainer } from '@unovis/ts'

const chart = new XYContainer(ref, config, data)

setTimeout(() => {
  chart.destroy()
}, 1000)
