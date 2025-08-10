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

// Node components — match OKK/Peribadatan styling
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
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: '#1e40af', width: 8, height: 8 }}
    />
  </div>
)

const nodeTypes: NodeTypes = { department: DepartmentNode, team: TeamNode, subteam: SubTeamNode }

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: 'LR' | 'TB' = 'LR') => {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: direction, ranksep: 80, nodesep: 100 })

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
    g.setNode(node.id, { width, height })
  })

  edges.forEach((e) => g.setEdge(e.source, e.target))

  dagre.layout(g)

  const layoutedNodes = nodes.map((n) => {
    const gn = g.node(n.id)
    return { ...n, position: { x: gn.x - gn.width / 2, y: gn.y - gn.height / 2 } }
  })

  return { nodes: layoutedNodes, edges }
}

// Structure: Bidang Pemerhati -> 3 sub teams (no intermediate team node)
const initialNodes: Node[] = [
  {
    id: 'dept-pemerhati',
    type: 'department',
    position: { x: 0, y: 0 },
    data: { label: 'Bidang Pemerhati' },
    draggable: false,
  },

  {
    id: 'sub-karyawan',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Bidang Pemerhati Karyawan' },
    draggable: false,
  },
  {
    id: 'sub-pastoran',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Bidang Pemerhati Pastoran' },
    draggable: false,
  },
  {
    id: 'sub-aset',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Bidang Pemeliharaan Bangunan dan Aset Gereja' },
    draggable: false,
  },

  // Children of "Tim Bidang Pemeliharaan Bangunan dan Aset Gereja"
  {
    id: 'aset-desain',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Desain' },
    draggable: false,
  },
  {
    id: 'aset-me',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pemeliharaan Mechanical Engineering (ME)' },
    draggable: false,
  },
  {
    id: 'aset-bangunan',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pemeliharaan Bangunan' },
    draggable: false,
  },
  {
    id: 'aset-taman',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pemeliharaan Taman' },
    draggable: false,
  },
  {
    id: 'aset-pendataan',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pendataan Aset' },
    draggable: false,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'dept-to-karyawan',
    source: 'dept-pemerhati',
    target: 'sub-karyawan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-pastoran',
    source: 'dept-pemerhati',
    target: 'sub-pastoran',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-aset',
    source: 'dept-pemerhati',
    target: 'sub-aset',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },

  // Edges from sub-aset to its children
  {
    id: 'aset-to-desain',
    source: 'sub-aset',
    target: 'aset-desain',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'aset-to-me',
    source: 'sub-aset',
    target: 'aset-me',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'aset-to-bangunan',
    source: 'sub-aset',
    target: 'aset-bangunan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'aset-to-taman',
    source: 'sub-aset',
    target: 'aset-taman',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'aset-to-pendataan',
    source: 'sub-aset',
    target: 'aset-pendataan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
]

const PemerhatiOrganizationalChart = () => {
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

export default PemerhatiOrganizationalChart
