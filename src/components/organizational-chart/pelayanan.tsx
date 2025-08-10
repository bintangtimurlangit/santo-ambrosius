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
  <div className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-center text-sm shadow-sm border border-slate-300 w-[300px] h-[60px] flex items-center justify-center relative">
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
    id: 'dept-pelayanan',
    type: 'department',
    position: { x: 0, y: 0 },
    data: { label: 'Bidang Pelayanan' },
    draggable: false,
  },

  {
    id: 'team-pse',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Pengembangan Sosial Ekonomi (PSE)' },
    draggable: false,
  },
  {
    id: 'team-keluarga',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Kerasulan Keluarga' },
    draggable: false,
  },
  {
    id: 'team-pendidikan',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Pendidikan' },
    draggable: false,
  },
  {
    id: 'team-keadilan',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Keadilan dan Perdamaian' },
    draggable: false,
  },

  // Sub-teams under PSE
  {
    id: 'sub-karitatif',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Karitatif' },
    draggable: false,
  },
  {
    id: 'sub-kesehatan',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Kesehatan' },
    draggable: false,
  },
  {
    id: 'sub-pemberdayaan',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Pemberdayaan' },
    draggable: false,
  },
  {
    id: 'sub-bimbel',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Bimbingan Belajar (BimBel)' },
    draggable: false,
  },
  {
    id: 'sub-asak',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Ayo Sekolah Ayo Kuliah (ASAK)' },
    draggable: false,
  },
  {
    id: 'sub-abk-ubk',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Anak Berkebutuhan Khusus (ABK) dan Umat Berkebutuhan Khusus (UBK)' },
    draggable: false,
  },
  {
    id: 'sub-mrt',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Membangun Rumah Tangga (MRT)' },
    draggable: false,
  },
  {
    id: 'sub-parenting',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Parenting' },
    draggable: false,
  },
  {
    id: 'sub-discovery',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Discovery' },
    draggable: false,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'dept-to-pse',
    source: 'dept-pelayanan',
    target: 'team-pse',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-keluarga',
    source: 'dept-pelayanan',
    target: 'team-keluarga',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-pendidikan',
    source: 'dept-pelayanan',
    target: 'team-pendidikan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-keadilan',
    source: 'dept-pelayanan',
    target: 'team-keadilan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },

  // Sub teams of PSE
  {
    id: 'pse-to-karitatif',
    source: 'team-pse',
    target: 'sub-karitatif',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'pse-to-kesehatan',
    source: 'team-pse',
    target: 'sub-kesehatan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'pse-to-pemberdayaan',
    source: 'team-pse',
    target: 'sub-pemberdayaan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'pse-to-bimbel',
    source: 'team-pse',
    target: 'sub-bimbel',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'pse-to-asak',
    source: 'team-pse',
    target: 'sub-asak',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'pse-to-abk-ubk',
    source: 'team-pse',
    target: 'sub-abk-ubk',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'keluarga-to-mrt',
    source: 'team-keluarga',
    target: 'sub-mrt',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'keluarga-to-parenting',
    source: 'team-keluarga',
    target: 'sub-parenting',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'keluarga-to-discovery',
    source: 'team-keluarga',
    target: 'sub-discovery',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
]

const PelayananOrganizationalChart = () => {
  const { nodes, edges } = useMemo(() => getLayouted(initialNodes, initialEdges), [])

  return (
    <div className="w-full h-[840px] bg-sky-50 rounded-xl overflow-hidden">
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

export default PelayananOrganizationalChart
