const ReactDOM = require("react-dom/client")

exports.replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}
