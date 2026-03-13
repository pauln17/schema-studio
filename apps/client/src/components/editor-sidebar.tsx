import { memo } from "react";
import type { Table, Enum } from "@/types/schema";
import { TableSection } from "./table-section";
import { EnumSection } from "./enum-section";

interface EditorSidebarProps {
  tables: Table[];
  enums: Enum[];
  updateTables: (tables: Table[]) => void;
  deleteTable: (tableName: string) => void;
  renameTable: (oldName: string, newName: string) => void;
  renameColumn: (
    tableName: string,
    oldName: string,
    newName: string,
  ) => void;
  updateEnums: (enums: Enum[]) => void;
  deleteEnum: (enumName: string) => void;
  renameEnum: (oldName: string, newName: string) => void;
  renameEnumOption: (
    enumName: string,
    oldName: string,
    newName: string,
  ) => void;
}

function EditorSidebar({
  tables,
  enums,
  updateTables,
  deleteTable,
  renameTable,
  renameColumn,
  updateEnums,
  deleteEnum,
  renameEnum,
  renameEnumOption,
}: EditorSidebarProps) {
  const updateTable = (updated: Table) => {
    updateTables(tables.map((t) => (t.name === updated.name ? updated : t)));
  };

  const createTable = (name: string) => {
    const newTable: Table = {
      name,
      position: { x: 0, y: 0 },
      columns: [],
      indexes: [],
    };
    updateTables([...tables, newTable]);
  };

  const updateEnum = (updated: Enum) => {
    updateEnums(
      enums.map((e) => (e.name === updated.name ? updated : e)),
    );
  };

  const createEnum = (name: string) => {
    updateEnums([...enums, { name, options: [] }]);
  };

  return (
    <div className="w-80 shrink-0 border-r border-white/[0.06] bg-black flex flex-col overflow-hidden">
      {/* Sidebar Header*/}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
          Tables
        </h3>
        <button
          onClick={() => createTable("New Table")}
          className="cursor-pointer text-neutral-500 hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-white/[0.06]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/*Sidebar Content*/}
      <div className="flex-1 overflow-y-auto px-4 ">
        <div className="space-y-2">
          {/* Requires Enums For Type Display */}
          {tables.map((table) => (
            <TableSection
              key={table.name}
              table={table}
              allTables={tables}
              enums={enums}
              updateTable={updateTable}
              deleteTable={deleteTable}
              renameTable={renameTable}
              renameColumn={renameColumn}
            />
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
              Enums
            </h3>
            <button
              onClick={() => createEnum("New Enum")}
              className="cursor-pointer text-neutral-500 hover:text-emerald-400 transition-colors p-1 rounded-md hover:bg-white/[0.06]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-2 pb-2">
            {enums.map((enumItem) => (
              <EnumSection
                key={enumItem.name}
                enum={enumItem}
                updateEnum={updateEnum}
                deleteEnum={deleteEnum}
                renameEnum={renameEnum}
                renameEnumOption={renameEnumOption}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Export/Import SQL Buttons*/}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        <button className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] text-sm text-neutral-300 hover:bg-white/[0.1] hover:text-white transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Export SQL
        </button>
        <button className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] text-sm text-neutral-300 hover:bg-white/[0.1] hover:text-white transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Import SQL
        </button>
      </div>
    </div>
  );
}

export default memo(EditorSidebar);
