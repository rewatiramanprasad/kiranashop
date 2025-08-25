import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/lib/store'

export const SearchFilterSelector = createSelector(
  (state: RootState) => state.list.data,
  (state: RootState) => state.filterList.searchTerm,
  (data, searchTerm) => {
    if (!searchTerm) return data
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return (
      data
        //   .map((item) => ({ ...item, update: new Date(item.update).toISOString() }))
        .filter(
          (item) =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.mobile.toString().includes(lowerCaseSearchTerm)
        )
    )
  }
)

export const ContactFilterSelector = createSelector(
  (state: RootState) => state.contact.data,
  (state: RootState) => state.filterList.contactSearchTerm,
  (data, searchTerm) => {
    if (!searchTerm) return data
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.mobile.toString().includes(lowerCaseSearchTerm)
    )
  }
)
