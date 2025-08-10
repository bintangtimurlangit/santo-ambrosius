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
  <div className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-center text-sm shadow-sm border border-slate-300 w-[320px] h-[60px] flex items-center justify-center relative">
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
      width = 320
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
    id: 'dept-pewartaan',
    type: 'department',
    position: { x: 0, y: 0 },
    data: { label: 'Bidang Pewartaan' },
    draggable: false,
  },

  {
    id: 'team-katekese',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Katekese' },
    draggable: false,
  },
  {
    id: 'team-kitab',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Kerasulan Kitab Suci' },
    draggable: false,
  },
  {
    id: 'team-panggilan',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Panggilan' },
    draggable: false,
  },
  {
    id: 'team-konsos',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Komunikasi Sosial' },
    draggable: false,
  },
  {
    id: 'team-haak',
    type: 'team',
    position: { x: 0, y: 0 },
    data: { label: 'Tim Hubungan Antar Agama dan Kepercayaan (HAAK)' },
    draggable: false,
  },

  // Katekese sub teams
  {
    id: 'sub-baptis-bayi',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Baptis Bayi' },
    draggable: false,
  },
  {
    id: 'sub-baptis-remaja-dewasa',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Baptis Remaja dan Dewasa' },
    draggable: false,
  },
  {
    id: 'sub-komuni-pertama',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Komuni Pertama' },
    draggable: false,
  },
  {
    id: 'sub-krisma',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Krisma' },
    draggable: false,
  },
  {
    id: 'sub-bia',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Bina Iman Anak (BIA)' },
    draggable: false,
  },
  {
    id: 'sub-bir',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Bina Iman Remaja (BIR)' },
    draggable: false,
  },
  {
    id: 'sub-bio',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Bina Iman Orangtua Dewasa (BIO)' },
    draggable: false,
  },
  {
    id: 'sub-bil',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Bina Iman Lansia (BIL)' },
    draggable: false,
  },
  {
    id: 'sub-persink',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Persaudaraan Siswa-Siswi Non Katolik (PERSINK)' },
    draggable: false,
  },
  {
    id: 'sub-it-katekese',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim IT Katekese Digital dan Pengembangan' },
    draggable: false,
  },

  // Kitab Suci / Panggilan sub teams
  {
    id: 'sub-emmaus',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Emmaus Journey (EJ)' },
    draggable: false,
  },
  {
    id: 'sub-fasilitator-pul',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Fasilitator/Pemandu Umat Lingkungan (PUL)' },
    draggable: false,
  },
  {
    id: 'sub-warta',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Warta Ambrosius' },
    draggable: false,
  },

  // Komunikasi Sosial sub teams
  {
    id: 'sub-web',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Web dan Sosial Media' },
    draggable: false,
  },
  {
    id: 'sub-foto',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Foto' },
    draggable: false,
  },
  {
    id: 'sub-video',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Video' },
    draggable: false,
  },
  {
    id: 'sub-produksi',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Produksi' },
    draggable: false,
  },
  {
    id: 'sub-multimedia',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Multimedia' },
    draggable: false,
  },
  {
    id: 'sub-inventaris',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Inventarisasi' },
    draggable: false,
  },
  {
    id: 'sub-relasi-internal',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Relasi Internal' },
    draggable: false,
  },
  {
    id: 'sub-relasi-eksternal',
    type: 'subteam',
    position: { x: 0, y: 0 },
    data: { label: 'Sub Tim Relasi Eksternal' },
    draggable: false,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'dept-to-katekese',
    source: 'dept-pewartaan',
    target: 'team-katekese',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-kitab',
    source: 'dept-pewartaan',
    target: 'team-kitab',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-panggilan',
    source: 'dept-pewartaan',
    target: 'team-panggilan',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-konsos',
    source: 'dept-pewartaan',
    target: 'team-konsos',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'dept-to-haak',
    source: 'dept-pewartaan',
    target: 'team-haak',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },

  // Katekese
  {
    id: 'katekese-bayi',
    source: 'team-katekese',
    target: 'sub-baptis-bayi',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-remaja',
    source: 'team-katekese',
    target: 'sub-baptis-remaja-dewasa',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-komuni',
    source: 'team-katekese',
    target: 'sub-komuni-pertama',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-krisma',
    source: 'team-katekese',
    target: 'sub-krisma',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-bia',
    source: 'team-katekese',
    target: 'sub-bia',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-bir',
    source: 'team-katekese',
    target: 'sub-bir',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-bio',
    source: 'team-katekese',
    target: 'sub-bio',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-bil',
    source: 'team-katekese',
    target: 'sub-bil',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-persink',
    source: 'team-katekese',
    target: 'sub-persink',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'katekese-it',
    source: 'team-katekese',
    target: 'sub-it-katekese',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },

  // Kitab/Panggilan
  {
    id: 'kitab-emmaus',
    source: 'team-kitab',
    target: 'sub-emmaus',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'kitab-fasilitator',
    source: 'team-kitab',
    target: 'sub-fasilitator-pul',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'konsos-warta',
    source: 'team-konsos',
    target: 'sub-warta',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },

  // KomSos
  {
    id: 'konsos-web',
    source: 'team-konsos',
    target: 'sub-web',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'konsos-foto',
    source: 'team-konsos',
    target: 'sub-foto',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'konsos-video',
    source: 'team-konsos',
    target: 'sub-video',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'konsos-produksi',
    source: 'team-konsos',
    target: 'sub-produksi',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'konsos-multimedia',
    source: 'team-konsos',
    target: 'sub-multimedia',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'konsos-inventaris',
    source: 'team-konsos',
    target: 'sub-inventaris',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'haak-relasi-internal',
    source: 'team-haak',
    target: 'sub-relasi-internal',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
  {
    id: 'haak-relasi-eksternal',
    source: 'team-haak',
    target: 'sub-relasi-eksternal',
    type: 'step',
    style: { stroke: '#1e40af', strokeWidth: 3 },
  },
]

const PewartaanOrganizationalChart = () => {
  const { nodes, edges } = useMemo(() => getLayouted(initialNodes, initialEdges), [])

  return (
    <div className="w-full h-[1400px] bg-sky-50 rounded-xl overflow-hidden">
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

export default PewartaanOrganizationalChart
