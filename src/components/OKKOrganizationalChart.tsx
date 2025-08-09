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

// Type definitions for node data
interface NodeData {
  label: string
}

// Custom node component for department header
const DepartmentNode = ({ data }: { data: NodeData }) => (
  <div className="bg-sky-200 text-slate-700 px-6 py-3 rounded-lg font-semibold text-base shadow-lg border border-sky-300 w-[350px] h-[55px] flex items-center justify-center relative">
    <div className="text-center leading-tight">{data.label}</div>
    <Handle
      type="source"
      position={Position.Bottom}
      style={{
        background: '#1e40af',
        width: 10,
        height: 10,
        border: '2px solid #ffffff',
      }}
    />
  </div>
)

// Custom node component for teams
const TeamNode = ({ data }: { data: NodeData }) => (
  <div className="bg-sky-300 text-slate-700 px-4 py-3 rounded-lg font-medium text-center shadow-md border border-sky-400 w-[200px] h-[70px] flex items-center justify-center relative">
    <Handle
      type="target"
      position={Position.Top}
      style={{
        background: '#1e40af',
        width: 8,
        height: 8,
        border: '2px solid #ffffff',
      }}
    />
    <span className="text-sm leading-tight font-semibold">{data.label}</span>
    <Handle
      type="source"
      position={Position.Bottom}
      style={{
        background: '#1e40af',
        width: 8,
        height: 8,
        border: '2px solid #ffffff',
      }}
    />
  </div>
)

// Custom node component for sub-teams
const SubTeamNode = ({ data }: { data: NodeData }) => (
  <div className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-center text-sm shadow-sm border border-slate-300 w-[220px] h-[60px] flex items-center justify-center relative">
    <Handle
      type="target"
      position={Position.Top}
      style={{
        background: '#1e40af',
        width: 8,
        height: 8,
        border: '2px solid #ffffff',
      }}
    />
    <span className="leading-tight font-medium">{data.label}</span>
  </div>
)

// Define custom node types
const nodeTypes: NodeTypes = {
  department: DepartmentNode,
  team: TeamNode,
  subteam: SubTeamNode,
}

// Auto-layout function using Dagre
const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: direction, ranksep: 60, nodesep: 100 })

  nodes.forEach((node) => {
    // Define node dimensions based on type - made smaller to fit container
    let width = 200 // default team width (reduced from 224)
    let height = 70 // default height (reduced from 80)

    if (node.type === 'department') {
      width = 350 // larger for department (reduced from 400)
      height = 55
    } else if (node.type === 'subteam') {
      width = 220 // w-64 for sub-teams (reduced from 256)
      height = 60
    }

    dagreGraph.setNode(node.id, { width, height })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    let x = nodeWithPosition.x - nodeWithPosition.width / 2
    let y = nodeWithPosition.y - nodeWithPosition.height / 2

    // Ensure the three main teams are evenly spaced under the department header
    // Dagre sometimes spreads them unevenly depending on subtree sizes
    const departmentNode = dagreGraph.node('dept-okk')
    if (node.id === 'team-data' || node.id === 'team-arsip' || node.id === 'team-keuangan') {
      const centerX = departmentNode.x
      const horizontalSpacing = 320 // tune spacing between main teams

      if (node.id === 'team-arsip') {
        x = centerX - nodeWithPosition.width / 2
      } else if (node.id === 'team-data') {
        x = centerX - horizontalSpacing - nodeWithPosition.width / 2
      } else if (node.id === 'team-keuangan') {
        x = centerX + horizontalSpacing - nodeWithPosition.width / 2
      }
    }

    // Manual adjustment: Stack the Tim Keuangan sub-teams vertically in center
    if (
      node.id === 'subteam-pembukuan' ||
      node.id === 'subteam-kolektan' ||
      node.id === 'subteam-kasir'
    ) {
      // Find Tim Keuangan position to center all sub-teams under it
      const timKeuanganNode = dagreGraph.node('team-keuangan')
      const timArsipNode = dagreGraph.node('team-arsip')
      const subPemerhatiNode = dagreGraph.node('subteam-pemerhati')

      // Calculate the same vertical distance as Tim Arsip to its sub-team
      const arsipToSubDistance = subPemerhatiNode.y - timArsipNode.y

      x = timKeuanganNode.x - nodeWithPosition.width / 2 // Center all under Tim Keuangan

      if (node.id === 'subteam-pembukuan') {
        y = timKeuanganNode.y + arsipToSubDistance - 30 // Match Tim Arsip distance and adjust for node height
      } else if (node.id === 'subteam-kolektan') {
        y = timKeuanganNode.y + arsipToSubDistance - 30 + 70 // Second in stack
      } else if (node.id === 'subteam-kasir') {
        y = timKeuanganNode.y + arsipToSubDistance - 30 + 140 // Third in stack
      }
    }

    return {
      ...node,
      position: { x, y },
    }
  })

  return { nodes: layoutedNodes, edges }
}

// Define the organizational structure (no manual positioning needed!)
const initialNodes: Node[] = [
  // Main Department
  {
    id: 'dept-okk',
    type: 'department',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Bidang Organisasi Kesekretariatan dan Keuangan' },
    draggable: false,
  },

  // Main Teams
  {
    id: 'team-data',
    type: 'team',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Tim Data dan Kesekretariatan' },
    draggable: false,
  },
  {
    id: 'team-arsip',
    type: 'team',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Tim Arsip' },
    draggable: false,
  },
  {
    id: 'team-keuangan',
    type: 'team',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Tim Keuangan' },
    draggable: false,
  },

  // Sub Teams
  {
    id: 'subteam-pemerhati',
    type: 'subteam',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Sub Tim Pemerhati Sekretariat' },
    draggable: false,
  },
  {
    id: 'subteam-pembukuan',
    type: 'subteam',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Sub Tim Pembukuan' },
    draggable: false,
  },
  {
    id: 'subteam-kolektan',
    type: 'subteam',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Sub Tim Kolektan' },
    draggable: false,
  },
  {
    id: 'subteam-kasir',
    type: 'subteam',
    position: { x: 0, y: 0 }, // Will be auto-positioned
    data: { label: 'Kasir' },
    draggable: false,
  },
]

// Define the connections between nodes
const initialEdges: Edge[] = [
  // From Department to Teams
  {
    id: 'dept-to-data',
    source: 'dept-okk',
    target: 'team-data',
    type: 'step',
    style: {
      stroke: '#1e40af',
      strokeWidth: 3,
    },
    animated: false,
  },
  {
    id: 'dept-to-arsip',
    source: 'dept-okk',
    target: 'team-arsip',
    type: 'step',
    style: {
      stroke: '#1e40af',
      strokeWidth: 3,
    },
    animated: false,
  },
  {
    id: 'dept-to-keuangan',
    source: 'dept-okk',
    target: 'team-keuangan',
    type: 'step',
    style: {
      stroke: '#1e40af',
      strokeWidth: 3,
    },
    animated: false,
  },

  // From Teams to Sub Teams
  {
    id: 'arsip-to-pemerhati',
    source: 'team-arsip',
    target: 'subteam-pemerhati',
    type: 'step',
    style: {
      stroke: '#1e40af',
      strokeWidth: 3,
    },
    animated: false,
  },
  {
    id: 'keuangan-to-pembukuan',
    source: 'team-keuangan',
    target: 'subteam-pembukuan',
    type: 'step',
    style: {
      stroke: '#1e40af',
      strokeWidth: 3,
    },
    animated: false,
  },
  {
    id: 'pembukuan-to-kolektan',
    source: 'subteam-pembukuan',
    target: 'subteam-kolektan',
    type: 'step',
    style: {
      stroke: '#1e40af',
      strokeWidth: 3,
    },
    animated: false,
  },
  {
    id: 'kolektan-to-kasir',
    source: 'subteam-kolektan',
    target: 'subteam-kasir',
    type: 'step',
    style: {
      stroke: '#1e40af',
      strokeWidth: 3,
    },
    animated: false,
  },
]

const OKKOrganizationalChart = () => {
  // Use auto-layout to position nodes perfectly
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges),
    [],
  )

  return (
    <div className="w-full h-[600px] bg-sky-50 rounded-xl border border-sky-200 overflow-hidden">
      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
          minZoom: 0.6,
          maxZoom: 1.0,
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={true}
        zoomOnPinch={true}
        panOnDrag={true}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: 'step',
          style: { strokeWidth: 3, stroke: '#1e40af' },
        }}
        connectionLineType={ConnectionLineType.Step}
      >
        <Background variant={BackgroundVariant.Dots} color="#cbd5e1" gap={18} size={1} />
      </ReactFlow>
    </div>
  )
}

export default OKKOrganizationalChart
