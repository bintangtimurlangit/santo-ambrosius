'use client'

import React, { useMemo } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  BackgroundVariant,
  NodeTypes,
  ConnectionLineType,
  Handle,
  Position,
} from '@xyflow/react'
import dagre from '@dagrejs/dagre'
import '@xyflow/react/dist/style.css'

interface NodeData {
  label: string
}

const DepartmentNode = ({ data }: { data: NodeData }) => (
  <div className="bg-sky-200 text-slate-700 px-6 py-3 rounded-lg font-semibold text-base shadow-lg border border-sky-300 w-[280px] h-[55px] flex items-center justify-center relative">
    <div className="text-center leading-tight">{data.label}</div>
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: '#1e40af', width: 10, height: 10 }}
    />
  </div>
)

const TeamNode = ({ data }: { data: NodeData }) => (
  <div className="bg-sky-300 text-slate-700 px-4 py-3 rounded-lg font-medium text-center shadow-md border border-sky-400 w-[220px] h-[70px] flex items-center justify-center relative">
    <Handle
      type="target"
      position={Position.Left}
      style={{ background: '#1e40af', width: 8, height: 8, border: '2px solid #ffffff' }}
    />
    <span className="text-sm leading-tight font-semibold">{data.label}</span>
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: '#1e40af', width: 8, height: 8 }}
    />
  </div>
)

const SubTeamNode = ({ data }: { data: NodeData }) => (
  <div className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-center text-sm shadow-sm border border-slate-300 w-[260px] h-[60px] flex items-center justify-center relative">
    <Handle
      type="target"
      position={Position.Left}
      style={{ background: '#1e40af', width: 8, height: 8 }}
    />
    <span className="leading-tight font-medium">{data.label}</span>
  </div>
)

const nodeTypes: NodeTypes = { department: DepartmentNode, team: TeamNode, subteam: SubTeamNode }

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: 'TB' | 'LR' = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: direction, ranksep: 80, nodesep: 100 })

  nodes.forEach((node) => {
    let width = 220
    let height = 70
    if (node.type === 'department') {
      width = 280
      height = 55
    } else if (node.type === 'subteam') {
      width = 260
      height = 60
    }
    dagreGraph.setNode(node.id, { width, height })
  })

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target))

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const n = dagreGraph.node(node.id)
    return { ...node, position: { x: n.x - n.width / 2, y: n.y - n.height / 2 } }
  })

  return { nodes: layoutedNodes, edges }
}

const initialNodes: Node[] = [
  {
    id: 'dept-peribadatan',
    type: 'department',
    position: { x: 0, y: 0 },
    data: { label: 'Bidang Peribadatan' },
    draggable: false,
  },
  {
    id: 'team-peribadatan',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Bidang Peribadatan' },
    draggable: false,
  },

  // Sub teams (top to bottom as in the reference image)
  {
    id: 'sub-prodiakon',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Prodiakon' },
    draggable: false,
  },
  {
    id: 'sub-lektor',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Lektor/Lektris' },
    draggable: false,
  },
  {
    id: 'sub-pemazmur',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pemazmur' },
    draggable: false,
  },
  {
    id: 'sub-musik',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Musik Liturgi' },
    draggable: false,
  },
  {
    id: 'sub-penata',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Penata Umat' },
    draggable: false,
  },
  {
    id: 'sub-pa',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Putra Altar (PA)' },
    draggable: false,
  },
  {
    id: 'sub-ps',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Putri Sakristi (PS)' },
    draggable: false,
  },
  {
    id: 'sub-pendamping-paps',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pendamping PA/PS' },
    draggable: false,
  },
  {
    id: 'sub-dekorasi',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Dekorasi Altar' },
    draggable: false,
  },
  {
    id: 'sub-pic-ruangan',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim PIC Ruangan Gereja' },
    draggable: false,
  },
  {
    id: 'sub-pendamping-perkawinan',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pendamping Perkawinan' },
    draggable: false,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'dept-to-team',
    source: 'dept-peribadatan',
    target: 'team-peribadatan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-prodiakon',
    source: 'team-peribadatan',
    target: 'sub-prodiakon',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-lektor',
    source: 'team-peribadatan',
    target: 'sub-lektor',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-pemazmur',
    source: 'team-peribadatan',
    target: 'sub-pemazmur',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-musik',
    source: 'team-peribadatan',
    target: 'sub-musik',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-penata',
    source: 'team-peribadatan',
    target: 'sub-penata',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-pa',
    source: 'team-peribadatan',
    target: 'sub-pa',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-ps',
    source: 'team-peribadatan',
    target: 'sub-ps',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-paps',
    source: 'team-peribadatan',
    target: 'sub-pendamping-paps',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-dekorasi',
    source: 'team-peribadatan',
    target: 'sub-dekorasi',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-picruangan',
    source: 'team-peribadatan',
    target: 'sub-pic-ruangan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-pendamping-perkawinan',
    source: 'team-peribadatan',
    target: 'sub-pendamping-perkawinan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
]

const PeribadatanOrganizationalChart = () => {
  const { nodes, edges } = useMemo(() => getLayoutedElements(initialNodes, initialEdges, 'LR'), [])

  return (
    <div className="w-full h-[520px] bg-sky-50 rounded-xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, includeHiddenNodes: false, minZoom: 0.6, maxZoom: 1 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll
        zoomOnPinch
        panOnDrag
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ type: 'step', style: { strokeWidth: 3, stroke: '#1e40af' } }}
        connectionLineType={ConnectionLineType.Step}
      >
        <Background variant={BackgroundVariant.Dots} color="#cbd5e1" gap={18} size={1} />
      </ReactFlow>
    </div>
  )
}

export default PeribadatanOrganizationalChart
