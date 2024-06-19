import React, { type MutableRefObject, useEffect , useRef, useState } from "react"

// import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
// import '@kitware/vtk.js/Rendering/Misc/RenderingAPIs';
import "@kitware/vtk.js/Rendering/Profiles/Geometry"

import vtkElevationReader from "@kitware/vtk.js/IO/Misc/ElevationReader"
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor"
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper"
import vtkTexture from "@kitware/vtk.js/Rendering/Core/Texture"
import vtkGenericRenderWindow from "@kitware/vtk.js/Rendering/Misc/GenericRenderWindow"

const ObjViewer = () => {
  const vtkContainerRef: MutableRefObject<null | HTMLDivElement> = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context: MutableRefObject<null | any> = useRef(null)
  const [coneResolution, setConeResolution] = useState(6)
  const [representation, setRepresentation] = useState(2)

  useEffect(() => {
    const element = vtkContainerRef.current
    if (!context.current && element !== null) {
      const genericRenderer = vtkGenericRenderWindow.newInstance({})
      genericRenderer.setContainer(element)

      const reader = vtkElevationReader.newInstance({
        xSpacing: 0.015_68,
        ySpacing: 0.015_68,
        zScaling: 0.066_66,
      })
      // Download elevation and render when ready
      reader
        .setUrl(`https://kitware.github.io/vtk-js/data/elevation/dem.csv`)
        .then(() => {
          renderer.resetCamera()
          renderWindow.render()
        })

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.addEventListener('load', function textureLoaded() {
        const texture = vtkTexture.newInstance()
        texture.setInterpolate(true)
        texture.setImage(img)
        actor.addTexture(texture)
        renderWindow.render()
      })
      img.src = `https://kitware.github.io/vtk-js/data/elevation/dem.jpg`

      const mapper = vtkMapper.newInstance()
      mapper.setInputConnection(reader.getOutputPort())
      const actor = vtkActor.newInstance()
      actor.setMapper(mapper)

      const renderer = genericRenderer.getRenderer()
      const renderWindow = genericRenderer.getRenderWindow()
      renderer.addActor(actor)
      renderer.resetCamera()
      renderWindow.render()

      context.current = {
        genericRenderer,
        renderWindow,
        renderer,
        reader,
        actor,
        mapper,
      }
    }

    return () => {
      if (context.current) {
        const { genericRenderer, reader, actor, mapper } = context.current
        actor.delete()
        mapper.delete()
        reader.delete()
        genericRenderer.delete()
        context.current = undefined
      }
    }
  }, [vtkContainerRef, context])

  useEffect(() => {
    if (context.current) {
      const { reader, renderWindow } = context.current
      reader.setZScaling(coneResolution * 0.001)
      renderWindow.render()
    }
  }, [coneResolution])

  useEffect(() => {
    if (context.current) {
      const { actor, renderWindow } = context.current
      actor.getProperty().setRepresentation(representation)
      renderWindow.render()
    }
  }, [representation])

  return (
    <div>
      <div ref={vtkContainerRef} style={{}} />
      <table
        style={{
          top: "25px",
          left: "25px",
          background: "white",
          padding: "12px",
        }}
      >
        <tbody>
          <tr>
            <td>
              <select
                value={representation}
                style={{ width: "100%" }}
                onInput={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                  setRepresentation(Number(ev.target.value))
                }
              >
                <option value="0">Points</option>
                <option value="1">Wireframe</option>
                <option value="2">Surface</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="range"
                min="0"
                max="300"
                value={coneResolution}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setConeResolution(Number(ev.target.value))
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ObjViewer
