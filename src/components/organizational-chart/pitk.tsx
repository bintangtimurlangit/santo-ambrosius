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
  <div className="bg-sky-200 text-slate-700 px-6 py-3 rounded-lg font-semibold text-base shadow-lg border border-sky-300 w-[320px] h-[55px] flex items-center justify-center relative">
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
  <div className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-center text-sm shadow-sm border border-slate-300 w-[300px] h-[60px] flex items-center justify-center relative">
    <Handle
      type="target"
      position={Position.Left}
      style={{ background: '#1e40af', width: 8, height: 8 }}
    />
    <span className="leading-tight font-medium">{data.label}</span>
  </div>
)

const nodeTypes: NodeTypes = { department: DepartmentNode, team: TeamNode, subteam: SubTeamNode }

const getLayouted = (nodes: Node[], edges: Edge[]) => {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'LR', ranksep: 80, nodesep: 100 })

  nodes.forEach((n) => {
    let width = 220
    let height = 70
    if (n.type === 'department') {
      width = 320
      height = 55
    }
    if (n.type === 'subteam') {
      width = 300
      height = 60
    }
    g.setNode(n.id, { width, height })
  })

  edges.forEach((e) => g.setEdge(e.source, e.target))
  dagre.layout(g)

  const layoutedNodes = nodes.map((n) => {
    const gn = g.node(n.id)
    return { ...n, position: { x: gn.x - gn.width / 2, y: gn.y - gn.height / 2 } }
  })
  return { nodes: layoutedNodes, edges }
}

const initialNodes: Node[] = [
  {
    id: 'dept-pitk',
    type: 'department',
    position: { x: 0, y: 0 },
    data: { label: 'Bidang Pengembangan Iman, Talenta dan Kaderisasi (PITK)' },
    draggable: false,
  },
  {
    id: 'team-pitk',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim PITK' },
    draggable: false,
  },

  {
    id: 'sub-habitus',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Habitus Doa' },
    draggable: false,
  },
  {
    id: 'sub-retret',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Retret' },
    draggable: false,
  },
  {
    id: 'sub-training',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pelatihan (Training Centre)' },
    draggable: false,
  },
  {
    id: 'sub-modul',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Modul Bina Iman' },
    draggable: false,
  },
  {
    id: 'sub-litbang',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Litbang dan Database' },
    draggable: false,
  },
  {
    id: 'sub-perencanaan',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Perencanaan' },
    draggable: false,
  },
  {
    id: 'sub-ase',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Animasi, Sosialisasi dan Edukasi (ASE)' },
    draggable: false,
  },
  {
    id: 'sub-penggerak',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Penggerak Program Karya Paroki' },
    draggable: false,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'dept-to-team',
    source: 'dept-pitk',
    target: 'team-pitk',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-habitus',
    source: 'team-pitk',
    target: 'sub-habitus',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-retret',
    source: 'team-pitk',
    target: 'sub-retret',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-training',
    source: 'team-pitk',
    target: 'sub-training',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-modul',
    source: 'team-pitk',
    target: 'sub-modul',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-litbang',
    source: 'team-pitk',
    target: 'sub-litbang',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-perencanaan',
    source: 'team-pitk',
    target: 'sub-perencanaan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-ase',
    source: 'team-pitk',
    target: 'sub-ase',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'team-to-penggerak',
    source: 'team-pitk',
    target: 'sub-penggerak',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
]

const PITKOrganizationalChart = () => {
  const { nodes, edges } = useMemo(() => getLayouted(initialNodes, initialEdges), [])

  return (
    <div className="w-full h-[560px] bg-sky-50 rounded-xl overflow-hidden">
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

export default PITKOrganizationalChart
