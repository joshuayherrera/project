import React from 'react';
import styles from './DataTable.module.css';
import deleteIcon from "@/assets/icons/deleteTrash.svg"
import editIcon from "@/assets/icons/editBtn.svg"
import eyeIcon from "@/assets/icons/eyeIcon.svg"

interface Column {
    header: string;
    field?: string;
    body?: (row: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    onView?: (row: any) => void;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onView, onEdit, onDelete }) => {
    return (
        <div className={styles.sectionStructure}>
            <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.header}</th>
                            ))}
                            {(onView || onEdit || onDelete) && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.body ? col.body(row) : row[col.field || '']}
                                        </td>
                                    ))}
                                    {(onView || onEdit || onDelete) && (
                                        <td>
                                           <div className={styles.btnContainer}>
                                           {onView && (
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => onView(row)}
                                                    title="Ver"
                                                >
                                                   <img src={eyeIcon} alt="Ver" />
                                                </button>
                                            )}
                                            {onEdit && (
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => onEdit(row)}
                                                    title="Editar"
                                                >
                                                    <img src={editIcon} alt="Editar" />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => onDelete(row)}
                                                    title="Eliminar"
                                                >
                                                    <img src={deleteIcon} alt="Eliminar" />
                                                </button>
                                            )}
                                           </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)} className={styles.noData}>
                                    No se encontró información
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;