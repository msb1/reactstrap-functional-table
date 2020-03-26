<h1>reactstrap-functional-table</h3>
<h4>Reactstrap (bootstrap) table with cell edit, insert, select and delete rows</h5>

<p> 
Needed a Bootstrap table with cell edit, insert, select and delete rows for a ReactJS project. Currently using Reactstrap for Boostrap capability.
</p><p>
In prior Bootstrap projects, without ReactJS, used Datatables (https://www.datatables.net/) and MDBootstrap tables (https://mdbootstrap.com/docs/jquery/tables/datatables/). The former has issues where it maintains its own DOM and this can conflict with the ReactJS DOM of the parent app. There are work arounds but this is not something to consider for scale. The latter, MDBootstrap, does not provide access to the functional datatable for React without paying for the Pro Component version. (This does not work for the current project either.) Both of these Bootstrap Table API's are awesome but they do not work for the reasons given.
</p><p>
Next considered react-bootstrap-tables which has been deprecated and replaced by react-bootstrap-tables-next (https://react-bootstrap-table.github.io/react-bootstrap-table2/). This is a really nice API but the creator has not had adequate time to support the newer version (as this is not his primary occupation - totally understandable.) Consequently, when implementing react-bootstrap-tables-next, it became apparent that a considerable amount of the implementation needed to be written - so the utility of react-bootstrap-tables-next was far less than originally anticipated. 
</p><p>
Concluded that best approach was to use the reactstrap Bootstrap tables and add needed functionality:
</p>
<ol>
<li>Cell editing is enabled with html contentEditable=true for appropriate table cells. However, this requires a check on whether the table cell value actually changed since an onBlur event is fired when traversing through each cell whether a change is made or not. This check is needed since the tab key allows rapid traversal of table cells. A REST call to save the updates can be inserted in the class method "onWidgetChange"</li>
<li>Cell selection is done with Input checkboxes at the start of each row. This fire an onClick event to set the selection in the class state parameters. There is also a selectAll checkbox in the table header that shows a partial table selection when only some boxes are checked.</li>
<li>Row insert is accomplished with a Button above the table. A default entry is inserted and then cell editing can be used to add the actual table entries. REST calls can be inserted in the class method "onInsertWidgetRow"</li>
<li>Row delete is accomplished with a Button above the table. All selected entries are deleted when this button is pressed. REST calls can be inserted in the class method "onDeleteWidgetRow"</li>
<li>Included a Reset Button to reset row indices if needed starting with index = 1</li>
</ol>
<p>
Note that pagination was not needed for this project; however, this may be added in the future. Reactstrap has pagination features (since this is an extension of Boostrap to ReactJS).
</p>
<p>
Note that the component Page.js is not included here. If anyone wants to use this table, it is suggested they copy the FunctionalTablePage class into their application and replace the Page component with their own component. Also, REST calls with Axios are not included here since these can be very application specific and this author typically places Axios REST calls in service.js file (in a utils folder). 
</p><p>
Hope this is helpful to others using Reactstrap and wanting a functional table implementation.
</p>
