import { useState, useCallback, useMemo, type JSX } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
    type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import EditorSidebar from '@/components/editor-sidebar';
import EditorNavbar from '@/components/editor-navbar';
import TableNode from '@/components/table-node';
import type { Table, Enum } from '@/types/schema';

const defaultTables: Table[] = [
    {
        name: 'users',
        columns: [
            { name: 'id', type: 'UUID', primaryKey: true },
            { name: 'email', type: 'VARCHAR', unique: true, notNull: true },
            { name: 'role', type: 'USER_ROLE', default: 'member' },
            { name: 'active', type: 'BOOLEAN', default: 'true', notNull: true },
            { name: 'birth_date', type: 'DATE' },
            { name: 'created_at', type: 'TIMESTAMP', default: 'now()', notNull: true },
        ],
    },
    {
        name: 'posts',
        columns: [
            { name: 'id', type: 'UUID', primaryKey: true },
            { name: 'user_id', type: 'UUID', notNull: true, references: { table: 'users', column: 'id' } },
            { name: 'title', type: 'VARCHAR', notNull: true },
            { name: 'body', type: 'VARCHAR' },
            { name: 'status', type: 'POST_STATUS', default: 'draft' },
            { name: 'view_count', type: 'BIGINT', default: '0', notNull: true },
            { name: 'published_at', type: 'TIMESTAMP' },
            { name: 'created_at', type: 'TIMESTAMP', default: 'now()', notNull: true },
        ],
    },
    {
        name: 'comments',
        columns: [
            { name: 'id', type: 'UUID', primaryKey: true },
            { name: 'post_id', type: 'UUID', notNull: true, references: { table: 'posts', column: 'id' } },
            { name: 'user_id', type: 'UUID', notNull: true, references: { table: 'users', column: 'id' } },
            { name: 'content', type: 'VARCHAR', notNull: true },
            { name: 'created_at', type: 'TIMESTAMP', default: 'now()', notNull: true },
        ],
    },
    {
        name: 'tags',
        columns: [
            { name: 'id', type: 'UUID', primaryKey: true },
            { name: 'name', type: 'VARCHAR', unique: true, notNull: true },
        ],
    },
    {
        name: 'post_tags',
        columns: [
            { name: 'post_id', type: 'UUID', primaryKey: true, references: { table: 'posts', column: 'id' } },
            { name: 'tag_id', type: 'UUID', primaryKey: true, references: { table: 'tags', column: 'id' } },
        ],
    },
];

const defaultEnums: Enum[] = [
    { name: 'user_role', values: ['admin', 'member', 'guest'] },
    { name: 'post_status', values: ['draft', 'published', 'archived'] },
];

const nodePositions: Record<string, { x: number; y: number }> = {
    users: { x: 0, y: 0 },
    posts: { x: 400, y: 0 },
    comments: { x: 800, y: 0 },
    tags: { x: 400, y: 420 },
    post_tags: { x: 800, y: 420 },
};

function buildNodes(tables: Table[]): Node[] {
    return tables.map(t => ({
        id: t.name,
        type: 'table',
        position: nodePositions[t.name] ?? { x: 0, y: 0 },
        data: { label: t.name, columns: t.columns },
    }));
}

function buildEdges(tables: Table[]): Edge[] {
    const edges: Edge[] = [];
    for (const table of tables) {
        for (const col of table.columns) {
            if (col.references) {
                edges.push({
                    // List Table Name, Foreign Table Name, Foreign Column Name
                    id: `${table.name}-${col.references.table}-${col.name}`,
                    source: table.name,
                    target: col.references.table,
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#525252' },
                });
            }
        }
    }
    return edges;
}

export default function Editor() {
    const [tables, setTables] = useState<Table[]>(defaultTables);
    const [activeTab, setActiveTab] = useState('editor');
    const [enums] = useState<Enum[]>(defaultEnums);

    const [flowNodes, setFlowNodes] = useState<Node[]>(() => buildNodes(defaultTables));
    const [flowEdges, setFlowEdges] = useState<Edge[]>(() => buildEdges(defaultTables));

    // Handles Table Changes -- Updates List of All Tables & Derives it For React Flow Nodes & Edges
    const handleTablesChange = useCallback((updated: Table[]) => {
        setTables(updated);
        setFlowNodes(buildNodes(updated));
        setFlowEdges(buildEdges(updated));
    }, []);

    // Custom Node Types for React Flow -> React Flow Matches Node Types to Component Names to Generate Nodes
    const nodeTypes = useMemo(() => ({ table: TableNode }), []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setFlowNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setFlowEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => setFlowEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const tabContent: Record<string, JSX.Element> = {
        editor: (
            <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                colorMode="dark"
                proOptions={{ hideAttribution: true }}
                fitView

            >
                <Background color="#555555" className="!bg-black" />
                <Controls className="!mr-5" position="top-right" />
            </ReactFlow>
        ),
        sql: (
            <div className="flex-1 flex items-center justify-center bg-black text-neutral-500">
                <p className="text-sm">SQL View Coming Soon</p>
            </div>
        ),
    };

    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <EditorSidebar tables={tables} enums={enums} onTablesChange={handleTablesChange} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <EditorNavbar activeTab={activeTab} onTabChange={setActiveTab} />
                {tabContent[activeTab]}
            </div>
        </div>
    );
}
