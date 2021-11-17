<div class="portlet light">
    <div class="portlet-title">
        <div class="caption font-color">
            <i class="fa fa-globe font-color"></i> Logs
        </div>

    </div>
    <div class="portlet-body">
        <div class="table-toolbar">
            <div class="row">

                {{--@reorder-button@--}}

            </div>
        </div>

    </div>
    <form id="search-form">
        {{csrf_field()}}

        <div class="form-group">
            <input class="btn search btn-primary" id="search-form" type="button" value="Search"/>
        </div>
    </form>

    <table class="table table-striped table-bordered table-hover Logs " id="Logs">

        <thead>
        <tr class="tr-head">
            <th valign="middle" class="no-sorting table-checkbox-col hidden">
                <input type="checkbox" class="group-checkable">
            </th>

            <th valign="middle">
                Model
            </th>
            <th valign="middle">
                Data ID
            </th>
            <th valign="middle">
                Parent Model
            </th>
            <th valign="middle">
                Parent ID
            </th>
            <th valign="middle">
                Operation
            </th>

            <th valign="middle">
                Description
            </th>
            <th valign="middle">User Name</th>
            <th valign="middle">User Email</th>
        </tr>
        </thead>
        <tbody>
        @foreach($logs as $index => $log)
            <tr class="odd gradeX" id="data-row-{{$log->id}}">
                <td valign="middle" class="hidden">
                    <input type="hidden" value="{{$log->id}}" class="reorder-vals"/>
                    <input type="checkbox" name="items[]" class="table-checkbox" value="{{$log->id}}"/>
                </td>
                <td valign="middle">
                    {{$log->model_name}}
                </td>
                <td valign="middle">
                    {{$log->data_id}}
                </td>
                <td valign="middle">
                    {{$log->model_parent}}
                </td>
                <td valign="middle">
                    {{$log->parent_id}}
                </td>
                <td valign="middle">
                    {{$log->operation}}
                </td>
                <td valign="middle">
                    {{$log->description}}
                </td>
                <td valign="middle">{{$log->user->name}}</td>
                <td valign="middle">{{$log->user->email}}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
