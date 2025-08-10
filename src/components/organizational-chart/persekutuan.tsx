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
  <div className="bg-sky-200 text-slate-700 px-6 py-3 rounded-lg font-semibold text-base shadow-lg border border-sky-300 w-[260px] h-[55px] flex items-center justify-center relative">
    <div className="text-center leading-tight">{data.label}</div>
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: '#1e40af', width: 10, height: 10 }}
    />
  </div>
)

const TeamNode = ({ data }: { data: NodeData }) => (
  <div className="bg-sky-300 text-slate-700 px-4 py-3 rounded-lg font-medium text-center shadow-md border border-sky-400 w-[280px] h-[70px] flex items-center justify-center relative">
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
  <div className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-center text-sm shadow-sm border border-slate-300 w-[280px] h-[60px] flex items-center justify-center relative">
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
  g.setGraph({ rankdir: 'LR', ranksep: 80, nodesep: 120 })

  nodes.forEach((n) => {
    let width = 280
    let height = 70
    if (n.type === 'department') {
      width = 260
      height = 55
    }
    if (n.type === 'subteam') {
      width = 280
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
    id: 'dept-persekutuan',
    type: 'department',
    position: { x: 0, y: 0 },
    data: { label: 'Bidang Persekutuan' },
    draggable: false,
  },
  {
    id: 'team-omk',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Orang Muda Katolik (OMK)' },
    draggable: false,
  },
  {
    id: 'team-pendamping-omk',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Pendamping Orang Muda Katolik' },
    draggable: false,
  },
  {
    id: 'team-legio-bunda',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Legio Maria Bunda Pembaharu Dunia' },
    draggable: false,
  },
  {
    id: 'team-legio-immaculata',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Legio Maria Immaculata' },
    draggable: false,
  },
  {
    id: 'team-lansia',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Paguyuban Lansia' },
    draggable: false,
  },
  {
    id: 'team-guru',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Paguyuban Guru' },
    draggable: false,
  },
  {
    id: 'team-ptma',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Paguyuban Tenaga Medis (PTMA)' },
    draggable: false,
  },
  {
    id: 'team-it',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Paguyuban Informasi Teknologi (IT)' },
    draggable: false,
  },
  {
    id: 'team-wirausaha',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Paguyuban Wirausaha' },
    draggable: false,
  },
  {
    id: 'team-hukum',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Paguyuban Hukum (Advokat, Legal, Notaris)' },
    draggable: false,
  },

  // Sub-teams under Pendamping OMK
  {
    id: 'sub-pendamping-kmk',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pendamping KMK' },
    draggable: false,
  },
  {
    id: 'sub-pendamping-mudika',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pendamping Mudika' },
    draggable: false,
  },
  {
    id: 'sub-pendamping-remaja',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pendamping Remaja' },
    draggable: false,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'dept-to-omk',
    source: 'dept-persekutuan',
    target: 'team-omk',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-pendamping',
    source: 'dept-persekutuan',
    target: 'team-pendamping-omk',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-bunda',
    source: 'dept-persekutuan',
    target: 'team-legio-bunda',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-immaculata',
    source: 'dept-persekutuan',
    target: 'team-legio-immaculata',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-lansia',
    source: 'dept-persekutuan',
    target: 'team-lansia',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-guru',
    source: 'dept-persekutuan',
    target: 'team-guru',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-ptma',
    source: 'dept-persekutuan',
    target: 'team-ptma',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-it',
    source: 'dept-persekutuan',
    target: 'team-it',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-wirausaha',
    source: 'dept-persekutuan',
    target: 'team-wirausaha',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-hukum',
    source: 'dept-persekutuan',
    target: 'team-hukum',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },

  // Sub-teams of Pendamping OMK
  {
    id: 'pendamping-to-kmk',
    source: 'team-pendamping-omk',
    target: 'sub-pendamping-kmk',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'pendamping-to-mudika',
    source: 'team-pendamping-omk',
    target: 'sub-pendamping-mudika',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'pendamping-to-remaja',
    source: 'team-pendamping-omk',
    target: 'sub-pendamping-remaja',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
]

const PersekutuanOrganizationalChart = () => {
  const { nodes, edges } = useMemo(() => getLayouted(initialNodes, initialEdges), [])

  return (
    <div className="w-full h-[760px] bg-sky-50 rounded-xl overflow-hidden">
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

export default PersekutuanOrganizationalChart
