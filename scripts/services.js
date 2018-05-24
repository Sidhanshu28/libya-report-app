/**
 * Created by hisp on 2/12/15.
 */

var trackerReportsAppServices = angular.module('trackerReportsAppServices', [])
    .service('MetadataService', function () {
        return {
            getOrgUnit: function (id) {
                var def = $.Deferred();
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    url: '../../organisationUnits/' + id + ".json?fields=id,name,programs[id,name,programTrackedEntityAttributes[*],programStages[id,name,programStageDataElements[id,dataElement[id,name,optionSet[options[code,displayName]]],sortOrder]]]&paging=false",
                    success: function (data) {
                        def.resolve(data);
                    }
                });
                return def;
            },
            getHTMLfromDataset: function (ds, ou, pe) {
                var def = $.Deferred();
                $.ajax({
                    type: "GET",
                    dataType: "html",
                    contentType: "application/json",
                    url: '../../dataSetReport.json?ds=' + ds + '&pe=' + pe + '&ou=' + ou,
                    success: function (data) {
                        def.resolve(data);
                    }
                });
                return def;
            }

        }
    });
