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
            },
            getDatasets: function () {
                var def = $.Deferred();
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    url: '../../dataSets.json?fields=name,id,attributeValues[value,attribute[id,name]]&paging=none',
                    success: function (data) {
                        def.resolve(data);
                    }
                });
                return def;
            }

        }
    }).factory('util', function () {
        return {
            getweeks: function (sd, ed) {
                var arrayw = [];
                var i = 1;
                while (ed > sd) {
                    var wsd = new Date(sd);
                    var wed = new Date(sd);
                    var wed = wed.setDate(wed.getDate() + 6);
                    if (i < 10) { j = "0" + i; }
                    else { j = i; }
                    arrayw.push(new Date(wsd).getFullYear() + "W" + j + " - " + getProperDate(wsd) + " - " + getProperDate(new Date(wed)));
                    i++;
                    sd = new Date(sd).setDate(new Date(sd).getDate() + 7);
                }
                return arrayw;
            }
        }
    });    
